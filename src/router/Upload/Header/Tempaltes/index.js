import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { formatDate } from '@/utils/format';

import ProcessButtonLink from '@/components/ProcessButtonLink';
import HeaderTemplate from '@/components/HeaderTemplate';
import ProcessButton from '@/components/ProcessButton';
import IconDownload from '@/icons/Download';
import IconUpload from '@/icons/Upload';
import Spinner from '@/components/Spinner';

import {
  setStage,
  uploadFiles,
  fetchRecentFile,
  fetchDocumentDetails,
  fetchDocuments,
  setParentDocument,
} from '@/store/upload/actions';
import { firstUploadStages, globalStages } from '../../stages';
import styles from './styles.module.scss';


const getHeaderTempalteContent = (data) => [[
  { title: 'Последнее скачивание', value: '-', id: 0 },
  { title: 'Всего РК', value: data.data?.total, id: 1 },
],
[
  { title: 'Последняя загрузка во ВК', value: formatDate(data.createdAt, 'DD.MM.YYYY HH:MM:ss'), id: 0 },
  { title: 'Всего РК', value: data.data?.correct, id: 1 },
  { title: 'Новых РК', value: data.data?.new, id: 2 },
  { title: 'Ошибок', value: data.data?.incorrect, valueColor: 'red', id: 3 },
]];


const Header = function HeaderScreen() {
  const dispatch = useDispatch();

  const fileInput = useRef(null);

  const [fileIsLoaded, setFileIsLoaded] = useState(false);
  const [fileIsLoading, setFileIsLoading] = useState(false);
  const [detailsIsFetching, setDetailsIsFetching] = useState(false);
  const [uploadButtonDisabled, setUploadButtonDisabled] = useState(false);

  const recentFileData = useSelector(
    (state) => state.upload?.recentFile
  );
  const recentFile = useRef(recentFileData);
  useLayoutEffect(() => {
    recentFile.current = recentFileData;
  }, [recentFileData]);


  const fileDetailsData = useSelector(
    (state) => state.upload?.documentDetails
  );
  const fileDetails = useRef(fileDetailsData);
  useLayoutEffect(() => {
    fileDetails.current = fileDetailsData;
  }, [fileDetailsData]);


  const uploadedFilesData = useSelector(
    (state) => state.upload?.uploadedFiles || []
  );
  const uploadedFiles = useRef(uploadedFilesData);
  useLayoutEffect(() => {
    uploadedFiles.current = uploadedFilesData;
  }, [uploadedFilesData]);


  const allUploadedFilesData = useSelector(
    (state) => state.upload?.documents
  );
  const allUploadedFiles = useRef(allUploadedFilesData);
  useLayoutEffect(() => {
    allUploadedFiles.current = allUploadedFilesData;
  }, [allUploadedFilesData]);

  const stage = useSelector(
    (state) => state.upload.stage
  );

  const getParentDocumentState = (documents) => documents
    .find((doc) => doc.sequenceId === 0);

  const submitFile = async (data) => {
    setFileIsLoading(true);
    dispatch(setStage(firstUploadStages.fileIsLoading));
    await dispatch(uploadFiles(data));
    if (uploadedFiles.current?.length) {
      await dispatch(fetchDocuments());
      if (allUploadedFiles.current?.length) {
        const parentDoc = getParentDocumentState(allUploadedFiles.current);
        await dispatch(fetchDocumentDetails(parentDoc.id));
        if (fileDetails.current) {
          dispatch(setParentDocument(fileDetails.current));
        }
      }
      dispatch(setStage(firstUploadStages.selectList));
    } else {
      dispatch(setStage(globalStages.errorCheck));
    }
    setFileIsLoading(false);
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
    setDetailsIsFetching(true);

    await dispatch(fetchRecentFile());

    await dispatch(fetchDocuments());
    if (allUploadedFiles.current?.length) {
      const parentDoc = getParentDocumentState(allUploadedFiles.current);
      await dispatch(fetchDocumentDetails(parentDoc.id));
      if (fileDetails.current) {
        dispatch(setParentDocument(fileDetails.current));
      }
    }

    setDetailsIsFetching(false);
  })(), [dispatch]);


  useEffect(() => {
    if (Object.keys(recentFile.current).length) {
      return setFileIsLoaded(false);
    }
    setFileIsLoaded(true);
  }, [recentFile]);

  useEffect(() => {
    switch (stage) {
      case firstUploadStages.selectList:
      case firstUploadStages.filseIsNotLoaded:
      case globalStages.errorCheck:
        setUploadButtonDisabled(false);
        break;
      default:
        setUploadButtonDisabled(true);
    }
  }, [stage]);

  return (
    <div className={styles.headerTemplatesWrapper}>
      {detailsIsFetching
        ? <Spinner />
        : (
          <React.Fragment>
            <HeaderTemplate className={styles.headerTemplate}>
              <ProcessButtonLink
                icon={<IconDownload />}
                text={['Скачать', 'файл']}
                to={`/api/v1/document/${recentFile.current.id}/raw`}
                target="_blank"
                download
                disabled={!fileIsLoaded}
              />
              <div>
                {getHeaderTempalteContent(recentFile.current)[0]
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
                  disabled={fileIsLoading || uploadButtonDisabled}
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
                {getHeaderTempalteContent(recentFile.current)[1]
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

  );
};

export default Header;
