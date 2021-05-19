
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
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
  const dispatch = useDispatch();

  const stage = useSelector((state) => state.upload.stage);
  const list = useSelector((state) => state.upload.selectList || 'default');
  const uploadedFiles = useSelector((state) => state.upload?.uploadedFiles)
   || [];
  const listOptions = useSelector((state) => state.upload.documentDetails
    .data?.sheets?.map((item, index) => (
      { value: index, text: item }
    ))) || [];

  const taskData = useSelector((state) => state.upload.task || {});
  const task = useRef(taskData);

  const [
    acceptListButtonDisabled, setAcceptListButtonDisabled,
  ] = useState(false);

  const handleListSelect = (e) => {
    const { value } = e.target;
    dispatch(setSelectList(value));
  };

  const handleAcceptListButtonClick = async () => {
    setAcceptListButtonDisabled(true);
    await dispatch(fetchDocumentDetails(uploadedFiles[uploadedFiles.length - 1]
      .id));
    await dispatch(acceptFile());

    if (task && Object.keys(task.current)?.length) {
      dispatch(setStage(globalStages.loadImage));
    } else {
      dispatch(setStage(globalStages.errorCheck));
    }
  };

  useEffect(() => {
    if (list === 'default') {
      return setAcceptListButtonDisabled(true);
    }
    setAcceptListButtonDisabled(false);
  }, [list]);

  useLayoutEffect(() => {
    task.current = taskData;
  }, [taskData]);

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
