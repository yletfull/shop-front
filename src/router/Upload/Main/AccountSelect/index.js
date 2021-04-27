
import React, { useState } from 'react';

import FingerIcon from '@/icons/Finger';
import VentIcon from '@/icons/Vent';
import Select from '@/components/Select';
import Button from '@/components/Button';
import NavigationBar from '@/components/NavigationBar';
import styles from './styles.module.scss';


const Upload = function UploadScreen() {
  const stages = {
    filseIsNotLoaded: 'filseIsNotLoaded',
    selectFile: 'selectFile',
    fileIsLoading: 'fileIsLoading',
  };

  const selectorMocksOptions = [
    {
      value: 'list1',
      text: 'list1',
    },
    {
      value: 'list2',
      text: 'list2',
    },
  ];

  const navigationBarParams = {
    prev: [],
    current: 'Загрузка файла',
    next: ['Проверка на ошибки', 'Загрузка изображений', 'Выгрузка на площадку'],
  };


  const [stage] = useState(
    stages.filseIsNotLoaded
  );

  const [list, setList] = useState(selectorMocksOptions[1].value);

  const handleListSelect = (e) => {
    const { value } = e.target;
    setList(value);
  };

  return (
    <div className={styles.wrapper}>
      {stage !== stages.filseIsNotLoaded
        && (
          <NavigationBar
            params={navigationBarParams}
          />
        )}

      <div className={styles.contentWrapper}>
        {stage === stages.filseIsNotLoaded
        && (
          <React.Fragment>
            <FingerIcon className={styles.icon} />
            <p className={styles.title}>
              Для начала работы выберите аккаунт и клиента
            </p>
          </React.Fragment>
        )}

        {stage === stages.selectFile
        && (
          <div className={styles.selectFile}>
            <p className={styles.selectFileTitle}>
              Выберите лист:
            </p>
            <div>
              <Select
                value={list}
                options={selectorMocksOptions}
                onChange={handleListSelect}
                className={styles.select}
              />
              <Button
                className={styles.selectFileButton}
              >
                выбрать
              </Button>
            </div>
          </div>
        )}

        {stage === stages.fileIsLoading
        && (
          <React.Fragment>
            <VentIcon className={styles.icon} />
            <p className={styles.title}>
              Файл загружается..
            </p>
          </React.Fragment>
        )}

      </div>
    </div>
  );
};

export default Upload;
