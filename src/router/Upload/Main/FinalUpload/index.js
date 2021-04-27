
import React, { useState } from 'react';

import SuccessIcon from '@/icons/Success.svg';
import VentIcon from '@/icons/Vent.svg';
import NavigationBar from '@/components/NavigationBar';
import styles from './styles.module.scss';


const Upload = function UploadScreen() {
  const stages = {
    fileIsLoading: 'fileIsLoading',
    fileIsLoaded: 'fileIsLoaded',
  };

  const navigationBarParams = {
    prev: ['Загрузка файла', 'Проверка на ошибки', 'Загрузка изображений'],
    current: 'Выгрузка на площадку',
    next: [],
  };


  const [stage] = useState(
    stages.fileIsLoaded
  );

  return (
    <div className={styles.wrapper}>
      <NavigationBar
        params={navigationBarParams}
      />

      <div className={styles.contentWrapper}>

        {stage === stages.fileIsLoading
        && (
          <React.Fragment>
            <img
              src={VentIcon}
              className={styles.icon}
              alt="vent"
            />
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
            <img
              src={SuccessIcon}
              className={styles.icon}
              alt="finger"
            />
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
