import React, { useState } from 'react';

import cx from 'classnames';
import TimesIcon from '@/icons/Times';
import UploadIcon from '@/icons/Upload';
import VkIcon from '@/icons/Vk';
import TestImage from '@/images/TestImage.jpg';
import PicturesLoadIcon from '@/icons/PicturesLoad';
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
            icon={<PicturesLoadIcon />}
            text={['Подгрузить', 'изображения']}
            className={styles.loadButton}
          />
          <ProcessButton
            icon={<VkIcon />}
            text={['Выгрузить РК', 'во Вконтакт']}
            className={styles.loadButton}
          />
        </div>
      </div>

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

export default Upload;
