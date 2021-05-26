
import React from 'react';
import { useSelector } from 'react-redux';
import { firstUploadStages } from '../stages';
import SelectorsBlock from './Selectors';
import TemplatesBlock from './Tempaltes';


const Header = function HeaderScreen() {
  const stage = useSelector((state) => state.upload.stage);

  const firstStage = stage === firstUploadStages.selectAccount;


  return (
    <React.Fragment>
      <SelectorsBlock />
      {!firstStage
        && (
          <TemplatesBlock />
        )}

    </React.Fragment>
  );
};

export default Header;
