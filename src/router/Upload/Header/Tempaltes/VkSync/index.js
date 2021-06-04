import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import ProcessButton from '@/components/ProcessButton';
import HeaderTemplate from '@/components/HeaderTemplate';
import SyncAltIcon from '@/icons/SyncAlt';
import Spinner from '@/components/Spinner';
import { syncVk, fetchTask, setDownloadAllAdsButtonDisabled } from '@/store/upload/actions';
import styles from './styles.module.scss';

const VkSyncTemplate = function VkSyncTemplateScreen() {
  const dispatch = useDispatch();

  const [isSyncInProcess, setIsSyncInProcess] = useState(false);
  const [syncError, setSyncError] = useState(false);

  const handleSyncButtonClick = async () => {
    setSyncError(false);
    setIsSyncInProcess(true);
    dispatch(setDownloadAllAdsButtonDisabled(true));

    const initialTask = await dispatch(syncVk());

    if (initialTask && Object.keys(initialTask).length) {
      let task = await dispatch(fetchTask(initialTask.id));
      (function check() {
        setTimeout(async () => {
          task = await dispatch(fetchTask(initialTask.id));

          if (task && Object.keys(task).length && task.status === 0) {
            return check();
          }

          clearTimeout(check);
          setIsSyncInProcess(false);

          if (task && Object.keys(task).length && task.status === 1) {
            return dispatch(setDownloadAllAdsButtonDisabled(false));
          }

          setSyncError(true);
        }, 1000);
      }
      )();
      return;
    }
    setIsSyncInProcess(false);
    setSyncError(true);
  };

  return (
    <HeaderTemplate className={styles.wrapper}>
      {!isSyncInProcess
        ? (
          <ProcessButton
            icon={<SyncAltIcon />}
            text={['Cинхронизироваться ', 'c ВК']}
            download
            onClick={handleSyncButtonClick}
          />
        )
        : <Spinner />}
      {syncError && (
      <p>
        Произошла ошибка
      </p>
      )}
    </HeaderTemplate>
  );
};

export default VkSyncTemplate;
