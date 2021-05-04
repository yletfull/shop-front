
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import FingerIcon from '@/icons/Finger';
import FileIcon from '@/icons/File';
import VentIcon from '@/icons/Vent';
import Select from '@/components/Select';
import Button from '@/components/Button';
import NavigationBar from '@/components/NavigationBar';
import { firstUploadStages as stages } from '../../stages';
import styles from './styles.module.scss';


const Upload = function UploadScreen() {
  const stage = useSelector((state) => state.upload.stage);


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

  const [list, setList] = useState(selectorMocksOptions[1].value);

  const handleListSelect = (e) => {
    const { value } = e.target;
    setList(value);
  };


  return (
    <div className={styles.wrapper}>
      {stage !== stages.selectAccount
            && (
              <NavigationBar
                params={navigationBarParams}
              />
            )}

      <div className={styles.contentWrapper}>
        {stage === stages.selectAccount
            && (
              <React.Fragment>
                <FingerIcon className={styles.icon} />
                <p className={styles.title}>
                  Для начала работы выберите аккаунт и клиента
                </p>
              </React.Fragment>
            )}

        {stage === stages.filseIsNotLoaded
            && (
              <React.Fragment>
                <FileIcon className={styles.icon} />
                <p className={styles.title}>
                  Загрузите файл
                </p>
              </React.Fragment>
            )}


        {stage === stages.selectList
            && (
              <div className={styles.selectList}>
                <p className={styles.selectList}>
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
                    className={styles.selectListButton}
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
