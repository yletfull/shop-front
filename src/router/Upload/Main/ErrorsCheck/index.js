
import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import WarningIcon from '@/icons/Warning';
import NavigationBar from '@/components/NavigationBar';
import Button from '@/components/Button';
import styles from './styles.module.scss';
import ErrorListPopup from './components/ErrorListPopup';

const navigationBarParams = {
  prev: ['Загрузка файла'],
  current: 'Проверка на ошибки',
  next: ['Загрузка изображений', 'Выгрузка на площадку'],
};

const Upload = function UploadScreen() {
  const queueList = useSelector(
    (state) => state.upload?.queueList
  );

  const [errorListPopupIsOpen, setErrorListPopupIsOpen] = useState(false);

  const handleErrorListPopupOpen = () => {
    setErrorListPopupIsOpen(true);
  };
  const handleErrorListPopupClose = () => {
    setErrorListPopupIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <NavigationBar
        params={navigationBarParams}
      />
      <div className={styles.contentWrapper}>
        <WarningIcon className={styles.icon} />
        <div className={styles.titleWrapper}>
          <div className={styles.textWrapper}>
            Файл содержит
            <Button
              appearance="control"
              className={styles.errorListPopupOpenButton}
              onClick={handleErrorListPopupOpen}
            >
              Ошибки
            </Button>
            .
          </div>
          <span>
            Вы можете скачать
            <Link
              to={`/api/v1/document/${queueList[0].data.documentId}/raw`}
              target="_blank"
            >
              {' '}
              файл
              {' '}
            </Link>
            с отмеченными ошибками
            для их исправления и повторной загрузки
          </span>
        </div>
      </div>
      {errorListPopupIsOpen && (
        <ErrorListPopup
          onClose={handleErrorListPopupClose}
          error={queueList[0].data.errorMessage}
        />
      )}
    </div>
  );
};

export default Upload;
