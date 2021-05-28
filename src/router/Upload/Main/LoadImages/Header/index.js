/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import VkIcon from '@/icons/Vk';
import PicturesLoadIcon from '@/icons/PicturesLoad';
import ProcessButton from '@/components/ProcessButton';
import NavigationBar from '@/components/NavigationBar';
import { setStage, uploadedFiles, uploadImages, fetchImages } from '@/store/upload/actions';
import { firstUploadStages, globalStages } from '../../../stages';
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

  const submitFile = async (formData) => {
    setFileIsLoading(true);
    await dispatch(uploadImages({ formData }));
    if (document.current) {
      await dispatch(fetchImages({
        documentId: documents.current[0].id,
      }));
    }
    // if (uploadedFiles.current?.length) {
    //   dispatch(setStage(firstUploadStages.selectList));
    // } else {
    //   dispatch(setStage(globalStages.errorCheck));
    // }
    setFileIsLoading(false);
  };
  const handleFileChange = (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('filename', e.target.files[0].name);
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
