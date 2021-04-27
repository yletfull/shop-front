
import React from 'react';

import WarningIcon from '@/icons/Warning';
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
        <WarningIcon className={styles.icon} />
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
