import React, { useState } from 'react';

import cx from 'classnames';
import TimesIcon from '@/icons/Times';
import UploadIcon from '@/icons/Upload';
import VkIcon from '@/icons/Vk.svg';
import TestImage from '@/images/TestImage.jpg';
import PicturesLoadIcon from '@/icons/PicturesLoad.svg';
import ProcessButton from '@/components/ProcessButton';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Button from '@/components/Button';
import NavigationBar from '@/components/NavigationBar';
import Indicator from '@/components/Indicator';
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

const navigationBarParams = {
  prev: ['Загрузка файла', 'Проверка на ошибки'],
  current: 'Загрузка изображений',
  next: ['Выгрузка на площадку'],
};

const Upload = function UploadScreen() {
  const [filter, setFilter] = useState({
    num: '',
    title: '',
    adFormat: '',
    banner: '',
  });


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

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <NavigationBar
          params={navigationBarParams}
        />
        <div className={styles.loadButtonsWrapper}>
          <ProcessButton
            icon={PicturesLoadIcon}
            text={['Подгрузить', 'изображения']}
            className={styles.loadButton}
          />
          <ProcessButton
            icon={VkIcon}
            text={['Выгрузить РК', 'во Вконтакт']}
            className={styles.loadButton}
          />
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <form
          action="/"
          className={cx(styles.row, styles.rowFilter)}
          onSubmit={handleFilterSubmit}
        >
          <span className={cx(styles.col, styles.colFilter, styles.colNum)}>
            <Input
              value={filter.num}
              onInput={handleNumInput}
              fullwidth
              placeholder="№ строки"
            />
          </span>
          <span className={cx(styles.col, styles.colFilter, styles.colTitle)}>
            <Input
              value={filter.title}
              onInput={handleTitleInput}
              fullwidth
              placeholder="Title"
            />
          </span>
          <span
            className={cx(
              styles.col,
              styles.colFilter,
              styles.colAdFormat
            )}
          >
            <Select
              value={filter.adFormat}
              options={selectorMocksOptions}
              resetText="Не выбрано"
              placeholder="Ad_format"
              onChange={handleAdFormatChange}
              className={styles.select}
              fullwidth
            />
          </span>
          <span className={cx(styles.col, styles.colFilter, styles.colBanner)}>
            <Select
              value={filter.banner}
              options={selectorMocksOptions}
              onChange={handleBannerChange}
              resetText="Не выбрано"
              placeholder="Banner"
              className={styles.select}
              fullwidth
            />
          </span>
          <span className={cx(styles.col, styles.colFilter, styles.colSubmit)}>
            <Button
              type="submit"
              className={styles.filterSubmit}
            >
              Найти
            </Button>
          </span>
        </form>

        <div className={cx(styles.row, styles.rowHeader)}>
          <span className={cx(styles.col, styles.colHeader, styles.colNum)}>
            <b>
              № строки
            </b>
          </span>
          <span className={cx(styles.col, styles.colHeader, styles.colTitle)}>
            <b>
              Title
            </b>
          </span>
          <span
            className={cx(
              styles.col,
              styles.colHeader,
              styles.colAdFormat
            )}
          >
            <b>
              Ad_format
            </b>
          </span>
          <span className={cx(styles.col, styles.colHeader, styles.colBanner)}>
            <span>
              <b>
                Banner
              </b>
            </span>
            <span className={styles.colBannerIconsWrapper}>
              <span>
                <b>
                  File
                </b>
              </span>
              <span>
                <TimesIcon
                  className={cx('red', styles.tableTimesIcon)}
                />
              </span>
              <span />
            </span>
          </span>
          <span className={cx(styles.col, styles.colHeader, styles.colSubmit)}>
            <b>
              Size
            </b>
          </span>
        </div>

        <div className={cx(styles.row, styles.rowContent)}>
          <span className={cx(styles.col, styles.colNum)}>
            11111
          </span>
          <span className={cx(styles.col, styles.colTitle)}>
            om01_353:: Подать руку помощи:: vk
          </span>
          <span className={cx(styles.col, styles.colAdFormat)}>
            1
          </span>
          <span className={cx(styles.col, styles.colBanner)}>
            <span>
              480x480
            </span>
            <span className={styles.colBannerIconsWrapper}>
              <span>
                <img
                  src={TestImage}
                  className={cx(styles.icon, styles.tableFileIcon)}
                  alt="upload"
                />
              </span>
              <span>
                <TimesIcon
                  className={cx('red', styles.tableTimesIcon)}
                />
              </span>
              <span>
                <UploadIcon />
              </span>
            </span>
          </span>
          <span className={cx(styles.col, styles.colSubmit)}>
            480x480

            <Indicator
              className={styles.indicator}
              color="red"
            />
          </span>
        </div>

      </div>
    </div>
  );
};

export default Upload;
