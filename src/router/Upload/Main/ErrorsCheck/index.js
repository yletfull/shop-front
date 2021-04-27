
import React from 'react';
// import cx from 'classnames';

import WarningIcon from '@/icons/Warning.svg';
import NavigationBar from '@/components/NavigationBar';
import styles from './styles.module.scss';

const navigationBarParams = {
  prev: ['Загрузка файла'],
  current: 'Проверка на ошибки',
  next: ['Загрузка изображений', 'Выгрузка на площадку'],
};

const Upload = function UploadScreen() {
  return (
    <div className={styles.wrapper}>
      <NavigationBar
        params={navigationBarParams}
      />
      <div className={styles.contentWrapper}>
        <img
          src={WarningIcon}
          className={styles.icon}
          alt="warn"
        />
        <div className={styles.titleWrapper}>
          <p>
            Файл содержит ошибки.
          </p>
          <p>
            Вы можете скачать файл с отмеченными ошибками
            для их исправления и повторной загрузки
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upload;
