
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import HeaderTemplate from '@/components/HeaderTemplate';
import ProcessButton from '@/components/ProcessButton';
import Select from '@/components/Select';
import Button from '@/components/Button';
import IconDownload from '@/icons/Download';
import IconUpload from '@/icons/Upload';
import { firstUploadStages } from '../stages';
import { fetchAccounts, fetchClients, fetchDocumentDetails, fetchDocuments, setAccount, setClient, setStage } from '../../../store/upload/actions';
import styles from './styles.module.scss';

const getHeaderTempalteContent = (data) => [[
  { title: 'Последнее скачивание', value: data.createdAt, id: 0 },
  { title: 'Всего РК', value: data.siblingsCount, id: 1 },
],
[
  { title: 'Последняя загрузка во ВК', value: data.createdAt, id: 0 },
  { title: 'Всего РК', value: data.siblingsCount, id: 1 },
  { title: 'Новых РК', value: '11', id: 2 },
  { title: 'Ошибок', value: '9', valueColor: 'red', id: 3 },
]];

const Header = function HeaderScreen() {
  const dispatch = useDispatch();

  const [accountsDisabled, setAccountsDisabled] = useState(false);
  const [clientsDisabled, setClientDisabled] = useState(true);
  const [changeButtonShow, setChangeButtonShow] = useState(true);

  const stage = useSelector((state) => state.upload.stage);
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
  const documents = useSelector(
    (state) => state.upload?.documents
  ) || '';
  const documentDetails = useSelector(
    (state) => state.upload?.documentDetails
  ) || '';

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

  const hanldeAcceptButtonClick = () => {
    if (selectClient && selectAccount) {
      setChangeButtonShow(true);
      setClientDisabled(true);
      setAccountsDisabled(true);
      dispatch(setStage(firstUploadStages.selectFile));
    }
  };

  useEffect(() => (async () => {
    if (!selectAccount) {
      setAccountsDisabled(true);
      await dispatch(fetchAccounts());
      setAccountsDisabled(false);
    } else {
      dispatch(fetchClients());
    }
    dispatch((setClient('')));
    setClientDisabled(true);
  })(), [dispatch, selectAccount]);

  useEffect(() => {
    if (clients.length) {
      setClientDisabled(false);
    }
  }, [dispatch, clients]);

  useEffect(() => (async () => {
    dispatch(setStage(firstUploadStages.filseIsNotLoaded));
    setChangeButtonShow(false);
  })(), [dispatch, selectAccount, selectClient]);

  const firstStage = stage === firstUploadStages.filseIsNotLoaded;

  useEffect(() => (async () => {
    if (firstStage) {
      dispatch(fetchDocuments());
    }
  })(), [dispatch, firstStage]);

  useEffect(() => (async () => {
    if (documents.length > 0) {
      return dispatch(fetchDocumentDetails(documents[0].id));
    }
    dispatch(setStage(firstUploadStages.filseIsNotLoaded));
  })(), [dispatch, documents]);

  return (
    <React.Fragment>
      <div className={styles.topWrapper}>
        <Select
          value={selectAccount}
          options={accountsSelectorOptions()}
          onChange={handleAccountChange}
          resetText="Не выбрано"
          placeholder="Аккаунт"
          className={styles.select}
          disabled={accountsDisabled}
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
          disabled={clientsDisabled}
        />
        {changeButtonShow
          ? (
            <Button
              style={{ 'font-size': '14px' }}
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
        <Button
          style={{ 'font-size': '14px' }}
          className={styles.downloadExcelModel}
          appearance="control"
        >
          <b>
            Скачать шаблон Excel-файла
          </b>
        </Button>
      </div>
      {!firstStage
        && (
        <div className={styles.headerTemplatesWrapper}>
          <HeaderTemplate className={styles.headerTemplate}>
            <ProcessButton
              icon={<IconDownload />}
              text={['Скачать', 'файл']}
            />
            <div>
              {getHeaderTempalteContent(documentDetails)[0]
                .map(({ title, value, id }) => (
                  <div
                    className={styles.textWrapper}
                    key={id}
                  >
                    <span>
                      {title}
                    </span>
                    <span className={styles.value}>
                      {value}
                    </span>
                  </div>
                ))}
            </div>
          </HeaderTemplate>
          <HeaderTemplate className={styles.headerTemplate}>
            <ProcessButton
              icon={<IconUpload />}
              text={['Загрузить', 'файл']}
            />
            <div>
              {getHeaderTempalteContent(documentDetails)[1]
                .map(({ title, value, id, valueColor }) => (
                  <div
                    className={styles.textWrapper}
                    key={id}
                  >
                    <span>
                      {title}
                    </span>
                    <span
                      className={cx(styles.value, { [valueColor]: valueColor })}
                    >
                      {value}
                    </span>
                  </div>
                ))}
            </div>
          </HeaderTemplate>
        </div>
        )}

    </React.Fragment>
  );
};

export default Header;
