import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '@/utils/format';

import ProcessButtonLink from '@/components/ProcessButtonLink';
import HeaderTemplate from '@/components/HeaderTemplate';
import IconDownload from '@/icons/Download';
import Spinner from '@/components/Spinner';

import {
  fetchRecentFile,
  fetchDocumentDetails,
  fetchDocuments,
  setParentDocument,
} from '@/store/upload/actions';
import { getDocumentDetails, getRecentFile, getRecentFileIsLoading, getUploadedFiles, getDocuments } from '@/store/upload/selectors';
import styles from './styles.module.scss';


const getHeaderTemplateContent = (data) => [
  { title: 'Последняя загрузка во ВК', value: formatDate(data.createdAt, 'DD.MM.YYYY HH:mm:ss'), id: 0 },
  { title: 'Всего РК', value: data.data?.total, id: 1 },
  { title: 'Новых РК', value: data.data?.new, id: 2 },
  { title: 'Ошибок', value: data.data?.incorrect, valueColor: 'red', id: 3 },
];


const LastProcessedTemplate = function LastProcessedTemplateScreen() {
  const dispatch = useDispatch();

  const [fileIsLoaded, setFileIsLoaded] = useState(false);
  const [detailsIsFetching, setDetailsIsFetching] = useState(false);

  const recentFileData = useSelector(getRecentFile);
  const recentFile = useRef(recentFileData);
  useLayoutEffect(() => {
    recentFile.current = recentFileData;
  }, [recentFileData]);

  const recentFileIsLoading = useSelector(getRecentFileIsLoading);

  const fileDetailsData = useSelector(getDocumentDetails);
  const fileDetails = useRef(fileDetailsData);
  useLayoutEffect(() => {
    fileDetails.current = fileDetailsData;
  }, [fileDetailsData]);


  const uploadedFilesData = useSelector(getUploadedFiles);
  const uploadedFiles = useRef(uploadedFilesData);
  useLayoutEffect(() => {
    uploadedFiles.current = uploadedFilesData;
  }, [uploadedFilesData]);


  const allUploadedFilesData = useSelector(getDocuments);
  const allUploadedFiles = useRef(allUploadedFilesData);
  useLayoutEffect(() => {
    allUploadedFiles.current = allUploadedFilesData;
  }, [allUploadedFilesData]);


  const getParentDocumentState = (documents) => documents
    .find((doc) => doc.sequenceId === 0);


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
    if (Object.keys(recentFileData).length) {
      return setFileIsLoaded(true);
    }
    setFileIsLoaded(false);
  }, [recentFileData]);

  return (
    detailsIsFetching
      ? <Spinner />
      : (
        <HeaderTemplate className={styles.wrapper}>
          <ProcessButtonLink
            icon={<IconDownload />}
            text={['Скачать', 'последний файл']}
            to={`/api/v1/document/${recentFileData.id}/raw`}
            target="_blank"
            download
            disabled={recentFileIsLoading || !fileIsLoaded}
          />
          <div>
            {getHeaderTemplateContent(recentFileData)
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

      )

  );
};

export default LastProcessedTemplate;
