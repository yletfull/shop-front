import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import ProcessButton from '@/components/ProcessButton';
import HeaderTemplate from '@/components/HeaderTemplate';
import VkIcon from '@/icons/Vk';
import Spinner from '@/components/Spinner';
import { syncVk, fetchTask, setDownloadAllAdsButtonDisabled } from '@/store/upload/actions';


const VkSyncTemplate = function VkSyncTemplateScreen() {
  const dispatch = useDispatch();

  const [isSyncInProcess, setIsSyncInProcess] = useState(false);
  const [syncError, setSyncError] = useState(false);

  const handleSyncButtonClick = async () => {
    setIsSyncInProcess(true);
    dispatch(setDownloadAllAdsButtonDisabled(true));

    const initialTask = await dispatch(syncVk());

    if (Object.keys(initialTask).length) {
      let task = await dispatch(fetchTask(initialTask.id));
      (function check() {
        if (Object.keys(task).length) {
          setTimeout(async () => {
            task = await dispatch(fetchTask(initialTask.id));
            if (task.status === 0) {
              return check();
            }

            clearTimeout(check);
            setIsSyncInProcess(false);

            if (task.status === 1 && Object.keys(task).length) {
              return dispatch(setDownloadAllAdsButtonDisabled(false));
            }
            setIsSyncInProcess(false);
            setSyncError(true);
          }, 1000);
          return;
        }
        setIsSyncInProcess(false);
        setSyncError(true);
      }
      )();
      return;
    }
    setIsSyncInProcess(false);
    setSyncError(true);
  };

  return (
    <HeaderTemplate>
      {!isSyncInProcess
        ? (
          <ProcessButton
            icon={<VkIcon />}
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
