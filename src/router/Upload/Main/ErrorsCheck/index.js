
import React, { useLayoutEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import WarningIcon from '@/icons/Warning';
import NavigationBar from '@/components/NavigationBar';
import styles from './styles.module.scss';

const navigationBarParams = {
  prev: ['Загрузка файла'],
  current: 'Проверка на ошибки',
  next: ['Загрузка изображений', 'Выгрузка на площадку'],
};

const Upload = function UploadScreen() {
  const recentFileData = useSelector(
    (state) => state.upload?.recentFile
  );
  const recentFile = useRef(recentFileData);
  useLayoutEffect(() => {
    recentFile.current = recentFileData;
  }, [recentFileData]);

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
          <span>
            Вы можете скачать
            <Link to={`/api/v1/document/${recentFile.current.id}/raw`}>
              файл
            </Link>
            с отмеченными ошибками
            для их исправления и повторной загрузки
          </span>
        </div>
      </div>
    </div>
  );
};

export default Upload;
