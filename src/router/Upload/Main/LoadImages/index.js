import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/Spinner';
import TimesIcon from '@/icons/Times';
import UploadIcon from '@/icons/Upload';
import TestImage from '@/images/TestImage.jpg';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Button from '@/components/Button';
import Indicator from '@/components/Indicator';
import { fetchImages } from '@/store/upload/actions';
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

const LoadImages = function LoadImagesScreen() {
  const dispatch = useDispatch();

  const imagesData = useSelector((state) => state.uplpad?.images);
  const images = useRef(imagesData);
  useLayoutEffect(() => {
    images.current = imagesData;
  }, [imagesData]);

  const uploadedFiles = useSelector((state) => state.upload?.uploadedFiles);

  const [filter, setFilter] = useState({
    num: '',
    title: '',
    adFormat: '',
    banner: '',
  });
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getImagesFn = async () => {
      setIsFetching(true);
      await dispatch(fetchImages(uploadedFiles[uploadedFiles.length - 1]
        .id));
      setIsFetching(false);
    };
    getImagesFn();
  }, [dispatch, uploadedFiles]);

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
    <div className={styles.wrapper}>
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

          <tr content="">
            <td>
              1
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
        </tbody>
      </table>
    </div>
  );
};

export default LoadImages;
