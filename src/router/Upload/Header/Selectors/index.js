
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from '@/components/Select';
import Button from '@/components/Button';
import ButtonLink from '@/components/ButtonLink';

import {
  fetchAccounts, fetchClients, fetchQueueList,
  setAccount, setClient, setStage,
  fetchRecentFile,
} from '@/store/upload/actions';
import { finalUploadStages, firstUploadStages, globalStages } from '../../stages';
import styles from './styles.module.scss';


const Header = function HeaderScreen() {
  const dispatch = useDispatch();

  const [accountSelectDisabled, setAccountSelectDisabled] = useState(false);
  const [clientSelectDisabled, setClientSelectDisabled] = useState(true);
  const [changeAccountButtonShow, setChangeAccountButtonShow] = useState(true);
  const [acceptButtonDisabled, setAcceptButtonDisabled] = useState(true);

  const accounts = useSelector(
    (state) => state.upload?.accounts
  );

  const clients = useSelector(
    (state) => state.upload?.clients
  );

  const selectAccount = useSelector(
    (state) => state.upload?.selectAccount
  ) || '';

  const selectClient = useSelector(
    (state) => state.upload?.selectClient
  ) || '';

  const queueListData = useSelector(
    (state) => state.upload?.queueList
  );
  const queueList = useRef(queueListData);
  useLayoutEffect(() => {
    queueList.current = queueListData;
  }, [queueListData]);

  const recentFileData = useSelector(
    (state) => state.upload?.recentFile
  );
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

  useEffect(() => (async () => {
    if (selectAccount && selectClient) {
      setAcceptButtonDisabled(false);
    } else {
      setAcceptButtonDisabled(true);
    }
    dispatch(setStage(firstUploadStages.selectAccount));
    setChangeAccountButtonShow(false);
  })(), [dispatch, selectAccount, selectClient]);

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
      const importTasks = queueList.current.map((task) => task.command === 'sync-xlsx:vk' && task);
      await dispatch(fetchRecentFile());


      if (importTasks.length > 0) {
        if (recentFile.current) {
          if (importTasks[0].status === -1) {
            return dispatch(setStage(globalStages.errorCheck));
          }
          if (importTasks[0].status === 1) {
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
