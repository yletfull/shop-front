
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FingerIcon from '@/icons/Finger';
import FileIcon from '@/icons/File';
import VentIcon from '@/icons/Vent';
import Select from '@/components/Select';
import Button from '@/components/Button';
import NavigationBar from '@/components/NavigationBar';
import { firstUploadStages as stages, globalStages } from '../../stages';
import { acceptFile, setStage, setSelectList, fetchDocumentDetails } from '../../../../store/upload/actions';
import styles from './styles.module.scss';

const navigationBarParams = {
  prev: [],
  current: 'Загрузка файла',
  next: ['Проверка на ошибки', 'Загрузка изображений', 'Выгрузка на площадку'],
};

const Upload = function UploadScreen() {
  const stage = useSelector((state) => state.upload.stage);
  const list = useSelector((state) => state.upload.selectList);
  const dispatch = useDispatch();

  const listOptions = useSelector((state) => state.upload.uploadedFiles[0]
    .data.sheets.map((value) => ({ value, text: value })));

  const [acceptButtonDisabled, setAcceptButtonDisabled] = useState(false);

  const handleListSelect = (e) => {
    const { value } = e.target;
    dispatch(setSelectList(value));
  };

  const handleAcceptListButtonClick = async () => {
    setAcceptButtonDisabled(true);
    try {
      const data = await dispatch(acceptFile());
      if (data) {
        return dispatch(setStage(globalStages.loadImage));
      }
      throw new Error('');
    } catch (err) {
      dispatch(fetchDocumentDetails());
      dispatch(setStage(globalStages.errorCheck));
    }
    setAcceptButtonDisabled(false);
  };

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
                    value={list}
                    options={listOptions}
                    onChange={handleListSelect}
                    className={styles.select}
                    placeholder="Лист"
                    resetText="Ничего не выбрано"
                  />
                  <Button
                    className={styles.selectListButton}
                    onClick={handleAcceptListButtonClick}
                    disabled={acceptButtonDisabled}
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
