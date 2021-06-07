/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import ProcessButton from '@/components/ProcessButton';
import HeaderTemplate from '@/components/HeaderTemplate';
import SyncAltIcon from '@/icons/SyncAlt';
import Spinner from '@/components/Spinner';
import { syncVk, fetchTask, setDownloadAllAdsButtonDisabled, setUploadButtonDisabled } from '@/store/upload/actions';
import { formatDate } from '@/utils/format';
import styles from './styles.module.scss';


const VkSyncTemplate = function VkSyncTemplateScreen() {
  const dispatch = useDispatch();

  const queueList = useSelector((state) => state.upload?.queueList);

  const selectAccountData = useSelector(
    (state) => state.upload?.selectAccount
  ) || '';
  const selectAccount = useRef(selectAccountData);
  useLayoutEffect(() => {
    selectAccount.current = selectAccountData;
  }, [selectAccountData]);

  const selectClientData = useSelector(
    (state) => state.upload?.selectClient
  ) || '';
  const selectClient = useRef(selectClientData);
  useLayoutEffect(() => {
    selectClient.current = selectClientData;
  }, [selectClientData]);

  const syncVkTaskData = useSelector((state) => state.upload?.syncVkTask);
  const syncVkTask = useRef(syncVkTaskData);
  useLayoutEffect(() => {
    syncVkTask.current = syncVkTaskData;
  });

  const [isSyncInProcess, setIsSyncInProcess] = useState(false);
  const [syncError, setSyncError] = useState(false);
  const [taksData, setTaskData] = useState({});

  const sync = async () => {
    setSyncError(false);
    setIsSyncInProcess(true);
    dispatch(setDownloadAllAdsButtonDisabled(true));
    dispatch(setUploadButtonDisabled(true));

    await dispatch(syncVk());

    if (syncVkTask.current && Object.keys(syncVkTask.current).length) {
      let task = await dispatch(fetchTask(syncVkTask.current.id));
      (function check() {
        return setTimeout(async () => {
          if (!selectAccount.current || !selectClient.current) {
            clearTimeout(check);
            return;
          }

          task = await dispatch(fetchTask(syncVkTask.current.id));

          if (
            task
            && Object.keys(task).length
            && (task.status === 0 || task.status === 1)) {
            return check();
          }

          setTaskData(task);
          clearTimeout(check);
          setIsSyncInProcess(false);
          dispatch(setUploadButtonDisabled(false));

          if (task && Object.keys(task).length && task.status === 2) {
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
    if (queueList[0].status === 0 || queueList[0].status === 1) {
      sync();
    }
  }, [queueList]);

  const handleSyncButtonClick = async () => {
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
          {formatDate(taksData?.finishedAt, 'DD.MM.YYYY HH:MM:ss')}
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
