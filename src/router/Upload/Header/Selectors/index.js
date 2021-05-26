
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from '@/components/Select';
import Button from '@/components/Button';
import ButtonLink from '@/components/ButtonLink';

import {
  fetchAccounts, fetchClients, fetchQueueList,
  setAccount, setClient, setStage,
} from '@/store/upload/actions';
import { firstUploadStages, globalStages } from '../../stages';
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

  const hanldeAcceptButtonClick = async () => {
    if (selectClient && selectAccount) {
      setChangeAccountButtonShow(true);
      setClientSelectDisabled(true);
      setAccountSelectDisabled(true);

      await dispatch(fetchQueueList());
      console.log(queueList);
      if (queueList.current.length > 0) {
        if (queueList.current[queueList.current.length - 1].status === 1) {
          return dispatch(setStage(firstUploadStages.selectList));
        }
        if (queueList.current[queueList.current.length - 1].status === -1) {
          console.log(queueList.current[queueList.current.length - 1].status);
          return dispatch(setStage(globalStages.errorCheck));
        }
        if (queueList.current[queueList.current.length - 1].status === 0) {
          return dispatch(setStage(globalStages.loadImage));
        }
        return;
      }
      dispatch(setStage(firstUploadStages.filseIsNotLoaded));
    }
  };

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
        to={`/api/v1/import?cabinetId=${selectAccount}&clientId=${selectClient}`}
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
