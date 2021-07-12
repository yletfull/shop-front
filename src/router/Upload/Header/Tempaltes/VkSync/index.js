/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import ProcessButton from '@/components/ProcessButton';
import HeaderTemplate from '@/components/HeaderTemplate';
import { queueTasksStatuses } from '@/constants/statuses';
import SyncAltIcon from '@/icons/SyncAlt';
import Spinner from '@/components/Spinner';
import {
  syncVk, fetchTask, setDownloadAllAdsButtonDisabled, setUploadButtonDisabled,
  fetchDashboard,
} from '@/store/upload/actions';
import { formatDate } from '@/utils/format';
import {
  getQueueList, getSelectAccount, getSelectClient, getSyncVkTask,
} from '@/store/upload/selectors';
import styles from './styles.module.scss';


const VkSyncTemplate = function VkSyncTemplateScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const queueList = useSelector(getQueueList);

  const selectAccountData = useSelector(getSelectAccount) || '';
  const selectAccount = useRef(selectAccountData);
  useLayoutEffect(() => {
    selectAccount.current = selectAccountData;
  }, [selectAccountData]);

  const selectClientData = useSelector(getSelectClient) || '';
  const selectClient = useRef(selectClientData);
  useLayoutEffect(() => {
    selectClient.current = selectClientData;
  }, [selectClientData]);

  const syncVkTaskData = useSelector(getSyncVkTask);
  const syncVkTask = useRef(syncVkTaskData);
  useLayoutEffect(() => {
    syncVkTask.current = syncVkTaskData;
  });

  const [isSyncInProcess, setIsSyncInProcess] = useState(false);
  const [syncError, setSyncError] = useState(false);

  const sync = async () => {
    if (syncVkTask.current && Object.keys(syncVkTask.current).length) {
      let task = await dispatch(fetchTask(syncVkTask.current.id));
      (function check() {
        return setTimeout(async () => {
          if (!selectAccount.current || !selectClient.current) {
            clearTimeout(check);
            return;
          }

          task = await dispatch(fetchTask(syncVkTask.current.id));

          const shouldCheck = task
            && Object.keys(task).length
            && (task?.status === queueTasksStatuses.created
              || task?.status === queueTasksStatuses.inProgress);
          if (shouldCheck) {
            return check();
          }

          clearTimeout(check);
          setIsSyncInProcess(false);
          dispatch(setUploadButtonDisabled(false));

          if (task && Object.keys(task).length && task?.status === 2) {
            dispatch(setDownloadAllAdsButtonDisabled(false));
            return;
          }

          setSyncError(true);
        }, 1000);
      }
      )();
      return;
    }
    dispatch(setUploadButtonDisabled(false));
    setIsSyncInProcess(false);
    setSyncError(true);
  };

  useEffect(() => {
    if (queueList[0]?.status === queueTasksStatuses.created
       || queueList[0]?.status === queueTasksStatuses.inProgress) {
      sync();
    }
  }, [queueList]);

  const handleSyncButtonClick = async () => {
    if (isSyncInProcess) {
      return;
    }

    setSyncError(false);
    setIsSyncInProcess(true);
    dispatch(setDownloadAllAdsButtonDisabled(true));
    dispatch(setUploadButtonDisabled(true));

    await dispatch(syncVk());

    sync();
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
      <div
        className={styles.textWrapper}
      >
        <span>
          Последняя синхронизация
        </span>
        <span className={styles.value}>
          {syncVkTaskData?.finishedAt
            ? formatDate(syncVkTaskData?.finishedAt, 'DD.MM.YYYY HH:mm:ss')
            : '-'}
        </span>
      </div>


      {syncError && (
      <p>
        Произошла ошибка
      </p>
      )}
    </HeaderTemplate>
  );
};

export default VkSyncTemplate;
