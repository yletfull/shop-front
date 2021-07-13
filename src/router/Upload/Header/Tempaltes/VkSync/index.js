import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProcessButton from '@/components/ProcessButton';
import HeaderTemplate from '@/components/HeaderTemplate';
import { queueTasksStatuses } from '@/constants/statuses';
import SyncAltIcon from '@/icons/SyncAlt';
import Spinner from '@/components/Spinner';
import {
  syncVk, fetchTask, setDownloadAllAdsButtonDisabled, setUploadButtonDisabled,
  fetchDashboard,
  syncVkTask,
} from '@/store/upload/actions';
import { formatDate } from '@/utils/format';
import {
  getSelectAccount, getSelectClient, getSyncVkTask,
} from '@/store/upload/selectors';
import styles from './styles.module.scss';


const VkSyncTemplate = function VkSyncTemplateScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

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

  const [isSyncInProcess, setIsSyncInProcess] = useState(false);
  const [syncError, setSyncError] = useState(false);

  const sync = useCallback(async () => {
    if (syncVkTaskData && Object.keys(syncVkTaskData).length) {
      let task = await dispatch(fetchTask(syncVkTaskData.id));
      (function check() {
        return setTimeout(async () => {
          if (!selectAccount.current || !selectClient.current) {
            clearTimeout(check);
            return;
          }

          task = await dispatch(fetchTask(syncVkTaskData.id));

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
            dispatch(syncVkTask(task));
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
  }, [syncVkTaskData, dispatch]);

  useEffect(() => {
    if (isSyncInProcess) {
      return;
    }

    if (syncVkTaskData?.status === queueTasksStatuses.created
       || syncVkTaskData?.status === queueTasksStatuses.inProgress) {
      setIsSyncInProcess(true);
      sync();
    }
  }, [syncVkTaskData, sync, isSyncInProcess]);

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
      {isSyncInProcess
        ? (
          <div className={styles.textWrapper}>
            Синхронизация в процессе
          </div>
        )
        : (
          <div className={styles.textWrapper}>
            <span>
              Последняя синхронизация
            </span>
            <span className={styles.value}>
              {syncVkTaskData?.finishedAt
                ? formatDate(syncVkTaskData?.finishedAt, 'DD.MM.YYYY HH:mm:ss')
                : '-'}
            </span>
          </div>
        )}


      {syncError && (
      <p>
        Произошла ошибка
      </p>
      )}
    </HeaderTemplate>
  );
};

export default VkSyncTemplate;
