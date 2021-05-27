import React from 'react';

import VkIcon from '@/icons/Vk';
import PicturesLoadIcon from '@/icons/PicturesLoad';
import ProcessButton from '@/components/ProcessButton';
import NavigationBar from '@/components/NavigationBar';
import styles from './styles.module.scss';

const navigationBarParams = {
  prev: ['Загрузка файла', 'Проверка на ошибки'],
  current: 'Загрузка изображений',
  next: ['Выгрузка на площадку'],
};

const LoadImagesHeader = function LoadImagesHeaderScreen() {
  return (
    <div className={styles.headerWrapper}>
      <NavigationBar
        params={navigationBarParams}
      />
      <div className={styles.loadButtonsWrapper}>
        <ProcessButton
          icon={<PicturesLoadIcon />}
          text={['Подгрузить', 'изображения']}
          className={styles.loadButton}
        />
        <ProcessButton
          icon={<VkIcon />}
          text={['Выгрузить РК', 'во Вконтакт']}
          className={styles.loadButton}
        />
      </div>
    </div>
  );
};

export default LoadImagesHeader;
