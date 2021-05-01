
import React from 'react';
import { useSelector } from 'react-redux';

import { globalStages } from '../stages';
import FirstUploadPage from './FirstUpload';
import ErrorsCheckPage from './ErrorsCheck';
import LoadImagesPage from './LoadImages';
import FinalUploadPage from './FinalUpload';
import styles from './styles.module.scss';

const Upload = function UploadScreen() {
  const stage = useSelector((state) => state.upload.stage);

  const renderStagesSwitch = () => {
    switch (stage) {
      case globalStages.firstUpload:
        return <FirstUploadPage />;
      case globalStages.errorCheck:
        return <ErrorsCheckPage />;
      case globalStages.loadImage:
        return <LoadImagesPage />;
      case globalStages.finalUpload:
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
