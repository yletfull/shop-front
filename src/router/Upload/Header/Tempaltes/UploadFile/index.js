import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTemplate from '@/components/HeaderTemplate';
import ProcessButton from '@/components/ProcessButton';
import IconUpload from '@/icons/Upload';
import Spinner from '@/components/Spinner';

import {
  setStage,
  uploadFiles,
  fetchRecentFile,
  fetchDocumentDetails,
  fetchDocuments,
  setParentDocument,
  setUploadButtonDisabled,
} from '@/store/upload/actions';
import { firstUploadStages, globalStages } from '../../../stages';
import styles from './styles.module.scss';


const UploadFileTemplate = function UploadFileTemplateScreen() {
  const dispatch = useDispatch();

  const fileInput = useRef(null);

  const [fileIsLoading, setFileIsLoading] = useState(false);
  const [detailsIsFetching, setDetailsIsFetching] = useState(false);

  const uploadButtonDisabled = useSelector(
    (state) => state.upload?.uploadButtonDisabled
  );

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
    switch (stage) {
      case firstUploadStages.selectList:
      case firstUploadStages.filseIsNotLoaded:
      case globalStages.errorCheck:
        dispatch(setUploadButtonDisabled(false));
        break;
      default:
        dispatch(setUploadButtonDisabled(true));
    }
  }, [dispatch, stage]);

  return (
    detailsIsFetching
      ? <Spinner />
      : (
        <HeaderTemplate className={styles.wrapper}>
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
        </HeaderTemplate>

      )

  );
};

export default UploadFileTemplate;
