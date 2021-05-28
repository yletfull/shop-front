/* eslint-disable react/no-array-index-key */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import TimesIcon from '@/icons/Times';
import UploadIcon from '@/icons/Upload';
// import TestImage from '@/images/TestImage.jpg';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Spinner from '@/components/Spinner';
import Button from '@/components/Button';
import Indicator from '@/components/Indicator';
import { fetchImages, fetchDocuments, setUploadedImages } from '@/store/upload/actions';
import Header from './Header';
import styles from './styles.module.scss';


const selectorMocksOptions = [
  {
    value: 'value1',
    text: 'value1Text',
  },
  {
    value: 'value2',
    text: 'value2Text',
  },
];

const LoadImagesTable = function LoadImagesTableScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const images = useSelector((state) => state.upload?.images);

  const uploadedImages = useSelector(
    (state) => state.upload?.uploadedImages
  );

  const parentDocumentData = useSelector(
    (state) => state.upload?.parentDocument
  );
  const parentDocument = useRef(parentDocumentData);
  useLayoutEffect(() => {
    parentDocument.current = parentDocumentData;
  }, [parentDocumentData]);

  const documentsData = useSelector((state) => state.upload?.documents);
  const documents = useRef(documentsData);
  useLayoutEffect(() => {
    documents.current = documentsData;
  }, [documentsData]);

  const [filter, setFilter] = useState({
    num: '',
    title: '',
    adFormat: '',
    banner: '',
  });

  const [imagesList, setImagesList] = useState([]);

  useEffect(() => {
    const getImagesFn = async () => {
      if (parentDocument.current) {
        setIsFetching(true);
        await dispatch(fetchImages({
          documentId: parentDocument.current.id,
        }));
        setIsFetching(false);
      }
    };
    getImagesFn();

    const getDocumentsFn = async () => {
      await dispatch(fetchDocuments({
        'filter[sequenceId][>]': '0',
        'filter[objectId]': parentDocument.current.id,
      }));
      if (documents.current?.length) {
        dispatch(setUploadedImages(documents.current));
        return;
      }
      dispatch(setUploadedImages([]));
    };
    getDocumentsFn();
  }, [dispatch, parentDocument]);

  useEffect(() => {
    if (uploadedImages.length) {
      const list = images.map((image) => ({
        ...image,
        imageFile: uploadedImages
          .find(
            (uploadedImage) => uploadedImage.fileName === image.imageName
          ),
      }));
      setImagesList(list);
      return;
    }
    setImagesList(images);
  }, [uploadedImages, images]);

  const handleNumInput = (e) => {
    const num = e.target.value;
    setFilter((prev) => ({
      ...prev,
      num,
    }));
  };

  const handleTitleInput = (e) => {
    const title = e.target.value;
    setFilter((prev) => ({
      ...prev,
      title,
    }));
  };

  const handleAdFormatChange = (e) => {
    const adFormat = e.target.value;

    setFilter((prev) => ({
      ...prev,
      adFormat,
    }));
  };

  const handleBannerChange = (e) => {
    const banner = e.target.value;

    setFilter((prev) => ({
      ...prev,
      banner,
    }));
  };

  const handleFilterSubmit = () => '';
  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div>
      <Header />
      <table>
        <tbody>
          <tr filter="">
            <td>
              <Input
                value={filter.num}
                onInput={handleNumInput}
                fullwidth
                placeholder="№ строки"
              />
            </td>
            <td colSpan="2">
              <Input
                value={filter.title}
                onInput={handleTitleInput}
                fullwidth
                placeholder="Title"
              />
            </td>
            <td>
              <Select
                value={filter.adFormat}
                options={selectorMocksOptions}
                resetText="Не выбрано"
                placeholder="Ad_format"
                onChange={handleAdFormatChange}
                className={styles.select}
                fullwidth
              />
            </td>
            <td colSpan="4">
              <Select
                value={filter.banner}
                options={selectorMocksOptions}
                onChange={handleBannerChange}
                resetText="Не выбрано"
                placeholder="Banner"
                className={styles.select}
                fullwidth
              />
            </td>
            <td>
              <Button
                onClick={handleFilterSubmit}
                className={styles.filterSubmit}
              >
                Найти
              </Button>
            </td>
          </tr>

          <tr header="">
            <td>
              Image name
            </td>
            <td>
              № строки
            </td>
            <td>
              Title
            </td>
            <td>
              Ad_format
            </td>
            <td>
              Banner
            </td>
            <td>
              File
            </td>
            <td />
            <td />
            <td>
              Size
            </td>
          </tr>

          {imagesList.length
            ? imagesList.map((image, ind) => (
              <tr
                content=""
                key={ind}
              >
                <td>
                  {image.imageName || '-'}
                </td>
                <td>
                  {image.rowIndex || '-'}
                </td>
                <td>
                  {image.campaignName || '-'}
                </td>
                <td>
                  {image.adFormat || '-'}
                </td>
                <td>
                  {image.imageFile ? '400x400' : '-'}
                </td>
                <td>
                  {image.imageFile
                    && (
                      <img
                        src={`/api/v1/document/${image.imageFile.id}/raw`}
                        className={cx(styles.icon, styles.tableFileIcon)}
                        alt="upload"
                      />
                    )}
                </td>
                <td>
                  <Button
                    appearance="control"
                    className={styles.tdButton}
                  >
                    {image.imageFile
                      && <TimesIcon className="red" />}
                  </Button>
                </td>
                <td>
                  <Button appearance="control">
                    <UploadIcon />
                  </Button>
                </td>
                <td>
                  <div className={styles.indicatorWrapper}>
                    {image.imageFile
                      && (
                        <span>
                          480x480
                        </span>
                      )}

                    <Indicator
                      className={styles.indicator}
                      color={image.imageFile ? 'green' : 'red'}
                    />
                  </div>
                </td>
              </tr>
            ))
            : (
              <tr content="">
                <td colSpan="9">
                  Изображения не найдены
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>

  );
};

export default LoadImagesTable;
