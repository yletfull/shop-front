/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { formatDate } from '@/utils/format';

import ProcessButtonLink from '@/components/ProcessButtonLink';
import HeaderTemplate from '@/components/HeaderTemplate';
import ProcessButton from '@/components/ProcessButton';
import IconDownload from '@/icons/Download';
import IconUpload from '@/icons/Upload';
import Spinner from '@/components/Spinner';

import { firstUploadStages, globalStages } from '../../stages';
import {
  fetchDocumentDetails,
  fetchDocuments, setStage,
  setUploadedFiles, uploadFiles,
} from '../../../../store/upload/actions';
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

  const [fileIsLoaded, setFileIsLoaded] = useState(false);
  const [detailsIsFetching, setDetailsIsFetching] = useState(false);

  const stage = useSelector((state) => state.upload.stage);
  const documents = useSelector(
    (state) => state.upload?.documents
  ) || '';
  const uploadedFiles = useSelector(
    (state) => state.upload?.uploadedFiles
  ) || '';

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

  const firstStage = stage === firstUploadStages.selectAccount;
  const documentsIsNotLoading = documents.length === 0;

  useEffect(() => (async () => {
    if (documents.length > 0) {
      dispatch(fetchDocumentDetails(documents[documents.length - 1].id));
    } else {
      dispatch(setStage(firstUploadStages.filseIsNotLoaded));
    }
  })(), [dispatch, documents]);

  return (
    !firstStage
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
        )
  );
};

export default Header;
