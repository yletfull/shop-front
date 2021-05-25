
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { formatDate } from '@/utils/format';

import ProcessButtonLink from '@/components/ProcessButtonLink';
import HeaderTemplate from '@/components/HeaderTemplate';
import ProcessButton from '@/components/ProcessButton';
import Select from '@/components/Select';
import Button from '@/components/Button';
import ButtonLink from '@/components/ButtonLink';
import IconDownload from '@/icons/Download';
import IconUpload from '@/icons/Upload';
import Spinner from '@/components/Spinner';

import { firstUploadStages, globalStages } from '../stages';
import {
  fetchAccounts, fetchClients, fetchDocumentDetails,
  fetchDocuments, setAccount, setClient, setStage,
  // eslint-disable-next-line no-unused-vars
  setUploadedFiles, uploadFiles,
} from '../../../store/upload/actions';
import styles from './styles.module.scss';

const getHeaderTempalteContent = (data) => [[
  { title: 'Последнее скачивание', value: '-', id: 0 },
  { title: 'Всего РК', value: '-', id: 1 },
],
[
  { title: 'Последняя загрузка во ВК', value: formatDate(data.createdAt, 'DD.MM.YYYY HH:MM:ss'), id: 0 },
  { title: 'Всего РК', value: '-', id: 1 },
  { title: 'Новых РК', value: '-', id: 2 },
  { title: 'Ошибок', value: '-', valueColor: 'red', id: 3 },
]];

const Header = function HeaderScreen() {
  const dispatch = useDispatch();

  const fileInput = useRef(null);

  const [accountSelectDisabled, setAccountSelectDisabled] = useState(false);
  const [clientSelectDisabled, setClientSelectDisabled] = useState(true);
  const [changeAccountButtonShow, setChangeAccountButtonShow] = useState(true);
  const [acceptButtonDisabled, setAcceptButtonDisabled] = useState(true);
  const [fileIsLoaded, setFileIsLoaded] = useState(false);
  const [detailsIsFetching, setDetailsIsFetching] = useState(false);

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
  const uploadedFiles = useSelector(
    (state) => state.upload?.uploadedFiles
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
      setChangeAccountButtonShow(true);
      setClientSelectDisabled(true);
      setAccountSelectDisabled(true);
      dispatch(setStage(firstUploadStages.selectList));
    }
  };

  const submitFile = async (data) => {
    setFileIsLoaded(true);
    dispatch(setStage(firstUploadStages.fileIsLoaded));
    await dispatch(uploadFiles(data));
    if (Object.keys(uploadedFiles).length) {
      dispatch(setStage(firstUploadStages.selectList));
    } else {
      dispatch(setStage(globalStages.errorCheck));
    }
    setFileIsLoaded(false);
  };

  const handleFileChange = (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('filename', e.target.files[0].name);
    submitFile(data);
  };

  const handleSelectFileButtonClick = () => {
    fileInput.current.click();
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

  const firstStage = stage === firstUploadStages.selectAccount;
  const documentsIsNotLoading = documents.length === 0;

  useEffect(() => (async () => {
    if (!firstStage) {
      setDetailsIsFetching(true);
      await dispatch(fetchDocuments());
      setDetailsIsFetching(false);
    }
  })(), [dispatch, firstStage]);

  useEffect(() => (async () => {
    if (documents.length > 0) {
      dispatch(fetchDocumentDetails(documents[documents.length - 1].id));
      return;
    }
    dispatch(setStage(firstUploadStages.selectAccount));
  })(), [dispatch, documents]);

  useEffect(() => (async () => {
    if (Object.keys(documentDetails).length > 0) {
      dispatch(setUploadedFiles([documentDetails]));
      return;
    }
    dispatch(setStage(firstUploadStages.selectAccount));
  })(), [dispatch, documentDetails]);

  return (
    <React.Fragment>
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
      {!firstStage
        && (
          <div className={styles.headerTemplatesWrapper}>
            {detailsIsFetching
              ? <Spinner />
              : (
                <React.Fragment>
                  <HeaderTemplate className={styles.headerTemplate}>
                    <ProcessButtonLink
                      icon={<IconDownload />}
                      text={['Скачать', 'файл']}
                      to={`/api/v1/document/${uploadedFiles[0].id}/raw`}
                      target="_blank"
                      download
                      disabled={fileIsLoaded || documentsIsNotLoading}
                    />
                    <div>
                      {getHeaderTempalteContent(uploadedFiles[0])[0]
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
                    <label>
                      <ProcessButton
                        icon={<IconUpload />}
                        text={['Загрузить', 'файл']}
                        onClick={handleSelectFileButtonClick}
                        disabled={fileIsLoaded}
                      />
                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        ref={fileInput}
                        onChange={handleFileChange}
                      />
                    </label>
                    <div>
                      {getHeaderTempalteContent(uploadedFiles[0])[1]
                        .map(({ title, value, id, valueColor }) => (
                          <div
                            className={styles.textWrapper}
                            key={id}
                          >
                            <span>
                              {title}
                            </span>
                            <span
                              className={cx(
                                styles.value, { [valueColor]: valueColor }
                              )}
                            >
                              {value}
                            </span>
                          </div>
                        ))}
                    </div>
                  </HeaderTemplate>
                </React.Fragment>
              )}
          </div>
        )}

    </React.Fragment>
  );
};

export default Header;
