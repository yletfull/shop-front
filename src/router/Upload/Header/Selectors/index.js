
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from '@/components/Select';
import Button from '@/components/Button';
import commands from '@/constants/commands';
import { queueTasksStatuses } from '@/constants/statuses';
import ButtonLink from '@/components/ButtonLink';

import {
  fetchAccounts, fetchClients, fetchQueueList,
  setAccount, setClient, setStage,
  fetchRecentFile,
} from '@/store/upload/actions';
import { getAccounts, getClients, getQueueList, getRecentFile, getSelectAccount, getSelectClient } from '@/store/upload/selectors';
import { finalUploadStages, firstUploadStages, globalStages } from '../../stages';
import styles from './styles.module.scss';


const Header = function HeaderScreen() {
  const dispatch = useDispatch();

  const [accountSelectDisabled, setAccountSelectDisabled] = useState(false);
  const [clientSelectDisabled, setClientSelectDisabled] = useState(true);
  const [changeAccountButtonShow, setChangeAccountButtonShow] = useState(true);
  const [acceptButtonDisabled, setAcceptButtonDisabled] = useState(true);

  const accounts = useSelector(getAccounts);

  const clients = useSelector(getClients);

  const selectAccount = useSelector(getSelectAccount) || '';

  const selectClient = useSelector(getSelectClient) || '';

  const queueListData = useSelector(getQueueList);
  const queueList = useRef(queueListData);
  useLayoutEffect(() => {
    queueList.current = queueListData;
  }, [queueListData]);

  const recentFileData = useSelector(getRecentFile);
  const recentFile = useRef(recentFileData);
  useLayoutEffect(() => {
    recentFile.current = recentFileData;
  }, [recentFileData]);

  const accountsSelectorOptions = () => {
    if (Object.values(accounts).length > 0) {
      return Object.values(accounts).map((account) => ({
        value: account?.id,
        text: account?.data?.account_name,
      }));
    }
    return [];
  };

  const clientsSelectorOptions = () => {
    if (Object.values(clients).length > 0) {
      return Object.values(clients).map((client) => ({
        value: client?.id,
        text: client?.title,
      }));
    }
    return [];
  };

  const handleAccountChange = (e) => {
    const id = e.target.value;
    dispatch(setClient(''));
    dispatch(setAccount(id));
  };

  const handleClientChange = (e) => {
    const id = e.target.value;
    dispatch(setClient(id));
  };

  const handleReset = () => {
    dispatch(setAccount(''));
    dispatch(setClient(''));
  };

  useEffect(() => {
    if (clients.length) {
      setClientSelectDisabled(false);
    }
  }, [dispatch, clients]);

  useEffect(() => {
    setAcceptButtonDisabled(!selectAccount || !selectClient);
    dispatch(setStage(firstUploadStages.selectAccount));
    setChangeAccountButtonShow(false);
  }, [dispatch, selectAccount, selectClient]);

  useEffect(() => (async () => {
    if (!selectAccount) {
      setAccountSelectDisabled(true);
      await dispatch(fetchAccounts());
      setAccountSelectDisabled(false);
    } else {
      dispatch(fetchClients());
    }
    dispatch((setClient('')));
    setClientSelectDisabled(true);
  })(), [dispatch, selectAccount]);

  const hanldeAcceptButtonClick = async () => {
    if (selectClient && selectAccount) {
      setChangeAccountButtonShow(true);
      setClientSelectDisabled(true);
      setAccountSelectDisabled(true);

      await dispatch(fetchQueueList());
      let importTasks = [];
      if (queueList.current && queueList.current.length) {
        importTasks = queueList.current
          .map((task) => task.command === commands.syncXlsxVk && task);
      }
      await dispatch(fetchRecentFile());


      if (importTasks.length > 0) {
        if (recentFile.current) {
          if (importTasks[0].status === queueTasksStatuses.error) {
            return dispatch(setStage(globalStages.errorCheck));
          }
          if (importTasks[0].status === queueTasksStatuses.inProgress) {
            return dispatch(setStage(finalUploadStages.fileIsLoading));
          }
          return dispatch(setStage(firstUploadStages.selectList));
        }
        return;
      }
      dispatch(setStage(firstUploadStages.filseIsNotLoaded));
    }
  };

  return (
    <div className={styles.topWrapper}>
      <div className={styles.selectionWrapper}>
        <Select
          value={selectAccount}
          options={accountsSelectorOptions()}
          onChange={handleAccountChange}
          resetText="Не выбрано"
          placeholder="Аккаунт"
          className={styles.select}
          disabled={accountSelectDisabled}
        />
        <span className={styles.separator}>
          /
        </span>
        <Select
          value={selectClient}
          options={clientsSelectorOptions()}
          onChange={handleClientChange}
          resetText="Не выбрано"
          placeholder="Клиент"
          className={styles.select}
          disabled={clientSelectDisabled}
        />
        {changeAccountButtonShow
          ? (
            <Button
              style={{ fontSize: '14px' }}
              className={styles.changeButton}
              appearance="control"
              onClick={handleReset}
            >
              <b>
                Изменить
              </b>
            </Button>
          )
          : (
            <div className={styles.buttonsWrapper}>
              <Button
                onClick={hanldeAcceptButtonClick}
                disabled={acceptButtonDisabled}
              >
                <b>
                  выбрать
                </b>
              </Button>
              <Button
                className={styles.rejectButon}
                onClick={handleReset}
                color="secondary"
              >
                <b>
                  отменить
                </b>
              </Button>
            </div>
          )}
      </div>
      <ButtonLink
        style={{ fontSize: '14px' }}
        className={styles.downloadExcelModel}
        appearance="control"
        to="/api/v1/import/template"
        target="_blank"
        download
      >
        <b>
          Скачать шаблон Excel-файла
        </b>
      </ButtonLink>
    </div>
  );
};

export default Header;
