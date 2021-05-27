import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import TimesIcon from '@/icons/Times';
import UploadIcon from '@/icons/Upload';
import TestImage from '@/images/TestImage.jpg';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Spinner from '@/components/Spinner';
import Button from '@/components/Button';
import Indicator from '@/components/Indicator';
import { fetchImages, fetchDocuments } from '@/store/upload/actions';
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

  const imagesData = useSelector((state) => state.upload?.images);
  const images = useRef(imagesData);
  useLayoutEffect(() => {
    images.current = imagesData;
  }, [imagesData]);

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

  useEffect(() => {
    const getDocumentsFn = async () => {
      setIsFetching(true);
      await dispatch(fetchDocuments());
    };
    getDocumentsFn();
  }, [dispatch]);

  useEffect(() => {
    const getImagesFn = async () => {
      if (documents.current?.length) {
        await dispatch(fetchImages({
          documentId: documents.current[documents.current.length - 1].id,
        }));
      }
      setIsFetching(false);
    };
    getImagesFn();
    console.log(documents);
  }, [dispatch, documents]);

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
              № строки
            </td>
            <td>
              Title
            </td>
            <td>
              Name
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

          {images.current.length
            ? images.current.map((image) => (
              <tr
                content=""
                key={image.id}
              >
                <td>
                  1
                </td>
                <td>
                  {image.title || '-'}
                </td>
                <td>
                  {image.fileName || '-'}
                </td>
                <td>
                  Ad_format
                </td>
                <td>
                  Banner
                </td>
                <td>
                  <img
                    src={TestImage}
                    className={cx(styles.icon, styles.tableFileIcon)}
                    alt="upload"
                  />
                </td>
                <td>
                  <Button
                    appearance="control"
                    className={styles.tdButton}
                  >
                    <TimesIcon className="red" />
                  </Button>
                </td>
                <td>
                  <Button appearance="control">
                    <UploadIcon />
                  </Button>
                </td>
                <td>
                  <div className={styles.indicatorWrapper}>
                    480x480
                    <Indicator
                      className={styles.indicator}
                      color="red"
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
