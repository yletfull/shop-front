import React, { useLayoutEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import VkIcon from '@/icons/Vk';
import PicturesLoadIcon from '@/icons/PicturesLoad';
import ProcessButton from '@/components/ProcessButton';
import NavigationBar from '@/components/NavigationBar';
import { uploadImages, fetchDocuments, setUploadedImages } from '@/store/upload/actions';
import styles from './styles.module.scss';


const navigationBarParams = {
  prev: ['Загрузка файла', 'Проверка на ошибки'],
  current: 'Загрузка изображений',
  next: ['Выгрузка на площадку'],
};

const LoadImagesHeader = function LoadImagesHeaderScreen() {
  const dispatch = useDispatch();
  const fileInput = useRef(null);

  const [fileIsLoading, setFileIsLoading] = useState(false);

  const documentsData = useSelector((state) => state.upload?.documents);
  const documents = useRef(documentsData);
  useLayoutEffect(() => {
    documents.current = documentsData;
  }, [documentsData]);

  const parentDocumentData = useSelector(
    (state) => state.upload?.parentDocument
  );
  const parentDocument = useRef(parentDocumentData);
  useLayoutEffect(() => {
    parentDocument.current = parentDocumentData;
  }, [parentDocumentData]);

  const submitFile = async (formData) => {
    setFileIsLoading(true);
    await dispatch(uploadImages({ formData }));
    await dispatch(fetchDocuments({
      'filter[sequenceId][>]': '0',
      'filter[objectId]': parentDocument.current.id,
    }));
    if (documents.current.length) {
      dispatch(setUploadedImages(documents.current));
    }
    setFileIsLoading(false);
  };
  const handleFileChange = (e) => {
    const data = new FormData();
    Object.values(e.target.files).forEach((file, ind) => {
      console.log(file);
      data.append(`file${ind}`, file);
      data.append(`filename${ind}`, file.name);
    });
    submitFile(data);
  };
  const handleSelectFileButtonClick = () => {
    fileInput.current.click();
  };


  return (
    <div className={styles.headerWrapper}>
      <NavigationBar
        params={navigationBarParams}
      />
      <div className={styles.loadButtonsWrapper}>
        <label>
          <ProcessButton
            icon={<PicturesLoadIcon />}
            text={['Подгрузить', 'изображения']}
            className={styles.loadButton}
            onClick={handleSelectFileButtonClick}
            disabled={fileIsLoading}
          />
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            ref={fileInput}
            onChange={handleFileChange}
            multiple
          />
        </label>
        <ProcessButton
          icon={<VkIcon />}
          text={['Выгрузить РК', 'во Вконтакт']}
          className={styles.loadButton}
        />
      </div>
    </div>
  );
};

export default LoadImagesHeader;
