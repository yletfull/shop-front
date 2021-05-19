
import React from 'react';
import { useSelector } from 'react-redux';
import { firstUploadStages } from '../stages';
import Selectors from './Selectors';
import Templates from './Tempaltes';

const Header = function HeaderScreen() {
  const stage = useSelector((state) => state.upload.stage);
  const firstStage = stage === firstUploadStages.selectAccount;

  return (
    <React.Fragment>
      <Selectors />
      {!firstStage && <Templates />}
    </React.Fragment>
  );
};

export default Header;
