
import React from 'react';
import { useSelector } from 'react-redux';
import { getStage } from '@/store/upload/selectors';
import { firstUploadStages } from '../stages';
import SelectorsBlock from './Selectors';
import TemplatesBlock from './Tempaltes';


const Header = function HeaderScreen() {
  const stage = useSelector(getStage);

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
