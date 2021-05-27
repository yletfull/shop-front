
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FingerIcon from '@/icons/Finger';
import FileIcon from '@/icons/File';
import VentIcon from '@/icons/Vent';
import Select from '@/components/Select';
import Button from '@/components/Button';
import NavigationBar from '@/components/NavigationBar';
import { setSelectedList, setStage } from '@/store/upload/actions';
import { firstUploadStages as stages, globalStages } from '../../stages';
import styles from './styles.module.scss';

const navigationBarParams = {
  prev: [],
  current: 'Загрузка файла',
  next: ['Проверка на ошибки', 'Загрузка изображений', 'Выгрузка на площадку'],
};

const Upload = function UploadScreen() {
  const dispatch = useDispatch();

  const stage = useSelector((state) => state.upload.stage);


  const selectedList = useSelector((state) => state.upload.selectedList || 'default');


  const listOptions = useSelector((state) => state.upload.documentDetails
    .data?.sheets?.map((item, index) => (
      { value: index, text: item }
    ))) || [];

  const [
    acceptListButtonDisabled, setAcceptListButtonDisabled,
  ] = useState(true);

  const handleListSelect = (e) => {
    const { value } = e.target;
    dispatch(setSelectedList(value));
  };

  const handleAcceptListButtonClick = async () => {
    dispatch(setStage(globalStages.loadImage));
  };

  useEffect(() => {
    if (selectedList === 'default') {
      return setAcceptListButtonDisabled(true);
    }
    setAcceptListButtonDisabled(false);
  }, [selectedList]);

  return (
    <div className={styles.wrapper}>
      {(stage !== stages.selectAccount)
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
                    value={selectedList}
                    options={listOptions}
                    onChange={handleListSelect}
                    className={styles.select}
                    placeholder="Лист"
                    resetText="Ничего не выбрано"
                  />
                  <Button
                    className={styles.selectListButton}
                    onClick={handleAcceptListButtonClick}
                    disabled={acceptListButtonDisabled}
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
