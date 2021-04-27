
import React, { useState } from 'react';
// import cx from 'classnames';

import AccountSelectPage from './AccountSelect';
import ErrorsCheckPage from './ErrorsCheck';
import LoadImagesPage from './LoadImages';
import FinalUploadPage from './FinalUpload';

import styles from './styles.module.scss';

const Upload = function UploadScreen() {
  const stages = {
    accountSelect: 'accountSelect',
    errorCheck: 'errorCheck',
    loadImage: 'loadImage',
    finalUpload: 'finalUpload',
  };

  const [stage] = useState(stages.accountSelect);

  const renderStagesSwitch = () => {
    switch (stage) {
      case stages.accountSelect:
        return <AccountSelectPage />;
      case stages.errorCheck:
        return <ErrorsCheckPage />;
      case stages.loadImage:
        return <LoadImagesPage />;
      case stages.finalUpload:
        return <FinalUploadPage />;
      default:
        return <AccountSelectPage />;
    }
  };

  return (
    <div className={styles.wrapper}>
      {renderStagesSwitch()}
    </div>
  );
};

export default Upload;
