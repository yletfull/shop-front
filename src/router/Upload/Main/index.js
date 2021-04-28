
import React from 'react';
import { useSelector } from 'react-redux';

import FirstUploadPage from './FirstUpload';
import ErrorsCheckPage from './ErrorsCheck';
import LoadImagesPage from './LoadImages';
import FinalUploadPage from './FinalUpload';

import styles from './styles.module.scss';

const Upload = function UploadScreen() {
  const stages = {
    firstUpload: 'firstUpload',
    errorCheck: 'errorCheck',
    loadImage: 'loadImage',
    finalUpload: 'finalUpload',
  };

  const stage = useSelector((state) => state.upload.stage);

  const renderStagesSwitch = () => {
    switch (stage) {
      case stages.firstUpload:
        return <FirstUploadPage />;
      case stages.errorCheck:
        return <ErrorsCheckPage />;
      case stages.loadImage:
        return <LoadImagesPage />;
      case stages.finalUpload:
        return <FinalUploadPage />;
      default:
        return <FirstUploadPage />;
    }
  };

  return (
    <div className={styles.wrapper}>
      {renderStagesSwitch()}
    </div>
  );
};

export default Upload;
