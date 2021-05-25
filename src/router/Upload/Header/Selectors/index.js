
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from '@/components/Select';
import Button from '@/components/Button';
import ButtonLink from '@/components/ButtonLink';

import { firstUploadStages, globalStages } from '../../stages';
import {
  fetchAccounts, fetchClients,
  fetchTasks,
  setAccount, setClient, setStage,
} from '../../../../store/upload/actions';
import styles from './styles.module.scss';

const Header = function HeaderScreen() {
  const dispatch = useDispatch();

  const [accountSelectDisabled, setAccountSelectDisabled] = useState(false);
  const [clientSelectDisabled, setClientSelectDisabled] = useState(true);
  const [changeAccountButtonShow, setChangeAccountButtonShow] = useState(true);
  const [acceptButtonDisabled, setAcceptButtonDisabled] = useState(true);

  const accountsData = useSelector(
    (state) => state.upload?.accounts || []
  );
  const accounts = useMemo(() => accountsData, [accountsData]);
  const clientsData = useSelector(
    (state) => state.upload?.clients || []
  );
  const clients = useMemo(() => clientsData, [clientsData]);
  const selectAccount = useSelector(
    (state) => state.upload?.selectAccount
  ) || '';
  const selectClient = useSelector(
    (state) => state.upload?.selectClient
  ) || '';
  const tasksArray = useSelector(
    (state) => state.upload?.tasks
  );
  const tasks = useRef(tasksArray);
  useLayoutEffect(() => {
    tasks.current = tasksArray;
  }, [tasksArray]);

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

      await dispatch(fetchTasks());
      if (tasks.current.length > 0) {
        if (tasks.current[tasks.current.length - 1].status === 1) {
          dispatch(setStage(firstUploadStages.selectList));
        } else {
          dispatch(setStage(globalStages.errorCheck));
        }
      } else {
        dispatch(setStage(firstUploadStages.filseIsNotLoaded));
      }
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
