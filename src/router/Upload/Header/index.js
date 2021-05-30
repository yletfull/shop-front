
import React from 'react';
import { useSelector } from 'react-redux';
import { firstUploadStages } from '../stages';
import SelectorsBlock from './Selectors';
import TemplatesBlock from './Tempaltes';


const Header = function HeaderScreen() {
  const stage = useSelector((state) => state.upload.stage);

  const firstStages = (stage === firstUploadStages.selectAccount)
    || (stage === firstUploadStages.filseIsNotLoaded);


  return (
    <React.Fragment>
      <SelectorsBlock />
      {!firstStages
        && (
          <TemplatesBlock />
        )}

    </React.Fragment>
  );
};

export default Header;
