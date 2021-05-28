
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuccessIcon from '@/icons/Success';
import VentIcon from '@/icons/Vent';
import NavigationBar from '@/components/NavigationBar';
import { importDocument, setStage, fetchTask } from '@/store/upload/actions';
import { finalUploadStages, finalUploadStages as stages, globalStages } from '../../stages';
import styles from './styles.module.scss';


const navigationBarParams = {
  prev: ['Загрузка файла', 'Проверка на ошибки', 'Загрузка изображений'],
  current: 'Выгрузка на площадку',
  next: [],
};

const Upload = function UploadScreen() {
  const dispatch = useDispatch();
  const stage = useSelector((state) => state.upload?.stage);

  const taskData = useSelector(
    (state) => state.upload?.task
  );
  const task = useRef(taskData);
  useLayoutEffect(() => {
    task.current = taskData;
  }, [taskData]);

  useEffect(() => {
    const finalImportFn = async () => {
      dispatch(setStage(finalUploadStages.fileIsLoading));
      await dispatch(importDocument());
      if (task.current) {
        console.log(task.current.id);
      }
      await dispatch(fetchTask(task.current?.id));
      // if (Object.keys(task.current).length) {
      //   (function check() {
      //     setTimeout(() => {
      //       if (task.current.status === 0 || task.current.status === 1) {
      //         return check();
      //       }
      //       clearTimeout(check);
      //     }, 1000);
      //   })();
      //   if (task.current.status === 2) {
      //     dispatch(setStage(finalUploadStages.fileIsLoaded));
      //   }
      //   return;
      // }
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
        {stage === stages.fileIsLoading
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

        {stage === stages.fileIsLoaded
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

export default Upload;
