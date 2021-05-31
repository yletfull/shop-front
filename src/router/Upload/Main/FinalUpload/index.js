/* eslint-disable no-unused-vars */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuccessIcon from '@/icons/Success';
import VentIcon from '@/icons/Vent';
import NavigationBar from '@/components/NavigationBar';
import { importDocument, setStage, fetchTask, fetchRecentFile, setRecentFile, setRecentFileIsLoading } from '@/store/upload/actions';
import { finalUploadStages, finalUploadStages as stages, globalStages } from '../../stages';
import styles from './styles.module.scss';


const defaultNavigationBarParams = {
  prev: ['Загрузка файла', 'Проверка на ошибки', 'Загрузка изображений'],
  current: 'Выгрузка на площадку',
  next: [],
  finally: false,
};

const FinalUpload = function FinalUploadScreen() {
  const dispatch = useDispatch();

  const [localStage, setLocalStage] = useState(finalUploadStages.fileIsLoading);
  const [
    navigationBarParams, setNaVigationBarParams,
  ] = useState(defaultNavigationBarParams);

  const stageData = useSelector((state) => state.upload?.stage);
  const stage = useRef(stageData);
  useLayoutEffect(() => {
    stage.current = stageData;
  }, [stageData]);

  useEffect(() => {
    const finalImportFn = async () => {
      setLocalStage(finalUploadStages.fileIsLoading);

      const importedDocument = await dispatch(importDocument());
      let task = await dispatch(fetchTask(importedDocument.id));
      dispatch(setRecentFileIsLoading(true));

      if (Object.keys(task).length) {
        (function check() {
          setTimeout(async () => {
            task = await dispatch(fetchTask(importedDocument.id));
            if (task.status === 0 || task.status === 1) {
              return check();
            }

            clearTimeout(check);
            dispatch(setRecentFileIsLoading(false));

            if (task.status === 2) {
              setNaVigationBarParams((prev) => ({ ...prev, finally: true }));
              setLocalStage(finalUploadStages.fileIsLoaded);
              dispatch(fetchRecentFile());
              return;
            }
            if (task.status === -1) {
              dispatch(setStage(globalStages.errorCheck));
            }
          }, 1000);
        })();
        return;
      }
      dispatch(setStage(globalStages.errorCheck));
    };
    finalImportFn();
  }, [dispatch]);


  return (
    <div className={styles.wrapper}>
      <NavigationBar
        params={navigationBarParams}
      />
      <div className={styles.contentWrapper}>
        {localStage === stages.fileIsLoading
        && (
          <React.Fragment>
            <VentIcon className={styles.icon} />
            <p className={styles.title}>
              Идёт выгрузка во Вконтакт.
              <br />
              Пожалуйста, дождитесь завершения операции.
            </p>
          </React.Fragment>
        )}

        {localStage === stages.fileIsLoaded
        && (
          <React.Fragment>
            <SuccessIcon className={styles.icon} />
            <p className={styles.title}>
              Выгрузка успешно завершена.
            </p>
          </React.Fragment>
        )}

      </div>
    </div>
  );
};

export default FinalUpload;
