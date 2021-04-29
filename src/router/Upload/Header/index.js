
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import HeaderTemplate from '@/components/HeaderTemplate';
import ProcessButton from '@/components/ProcessButton';
import Select from '@/components/Select';
import Button from '@/components/Button';
import IconDownload from '@/icons/Download';
import IconUpload from '@/icons/Upload';
import { firstUploadStages } from '../stages';
import { fetchAccounts, fetchClients, setAccount, setClient } from '../../../store/upload/actions';
import styles from './styles.module.scss';

const headerTemplates = [
  [
    { title: 'Последнее скачивание', value: '15.03.2021 15:55:31', id: 0 },
    { title: 'Всего РК', value: '661', id: 1 },
  ],
  [
    { title: 'Последняя загрузка во ВК', value: '15.03.2021 15:55:31', id: 0 },
    { title: 'Всего РК', value: '567', id: 1 },
    { title: 'Новых РК', value: '11', id: 2 },
    { title: 'Ошибок', value: '9', valueColor: 'red', id: 3 },
  ],
];

const Header = function HeaderScreen() {
  const dispatch = useDispatch();

  const stage = useSelector((state) => state.upload.stage);

  const accounts = useSelector((state) => state.upload?.accounts) || [];
  const selectAccount = useSelector(
    (state) => state.upload?.selectAccount?.id
  ) || '';

  const [clientsDisabled, setClientDisabled] = useState(true);
  const clients = useSelector((state) => state.upload.clients) || [];
  const selectClient = useSelector(
    (state) => state.upload?.selectClient?.id
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
    dispatch(setAccount(id));
  };

  const handleClientChange = (e) => {
    const id = e.target.value;
    dispatch(setClient(id));
  };

  const firstStage = stage === firstUploadStages.filseIsNotLoaded;

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      await dispatch(fetchAccounts());
      setIsFetching(false);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (selectAccount) {
      dispatch(fetchClients());
      setClientDisabled(false);
    }

    setClientDisabled(true);
  }, [dispatch, selectAccount]);

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
          disabled={isFetching}
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
          disabled={clientsDisabled || isFetching}
        />
        <Button
          style={{ 'font-size': '14px' }}
          className={styles.changeButton}
          appearance="control"
        >
          <b>
            Изменить
          </b>
        </Button>
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
              {headerTemplates[0].map(({ title, value, id }) => (
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
              {headerTemplates[1].map(({ title, value, id, valueColor }) => (
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
