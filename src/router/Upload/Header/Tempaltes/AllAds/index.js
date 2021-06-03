import React from 'react';
import { useSelector } from 'react-redux';

import ProcessButtonLink from '@/components/ProcessButtonLink';
import HeaderTemplate from '@/components/HeaderTemplate';
import IconDownload from '@/icons/Download';

const AllAdsTemplate = function AllAdsTemplateScreen() {
  const selectAccount = useSelector(
    (state) => state.upload?.selectAccount
  ) || '';
  const selectClient = useSelector(
    (state) => state.upload?.selectClient
  ) || '';

  return (
    <HeaderTemplate>
      <ProcessButtonLink
        icon={<IconDownload />}
        text={['Скачать', 'все объявления']}
        to={`/api/v1/import?cabinetId=${selectAccount}&clientId=${selectClient}`}
        target="_blank"
        download
        disabled={!(selectAccount && selectClient)}
      />
    </HeaderTemplate>
  );
};

export default AllAdsTemplate;
