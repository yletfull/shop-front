import React from 'react';
import { useSelector } from 'react-redux';

import ProcessButtonLink from '@/components/ProcessButtonLink';
import HeaderTemplate from '@/components/HeaderTemplate';
import IconDownload from '@/icons/Download';
import styles from './styles.module.scss';

const AllAdsTemplate = function AllAdsTemplateScreen() {
  const selectAccount = useSelector(
    (state) => state.upload?.selectAccount
  ) || '';
  const selectClient = useSelector(
    (state) => state.upload?.selectClient
  ) || '';
  const uploadButtonDisabled = useSelector(
    (state) => state.upload?.downloadAllAdsButtonDisabled
  ) ?? true;

  return (
    <HeaderTemplate className={styles.wrapper}>
      <ProcessButtonLink
        icon={<IconDownload />}
        text={['Скачать', 'все объявления']}
        to={`/api/v1/import?cabinetId=${selectAccount}&clientId=${selectClient}`}
        target="_blank"
        download
        disabled={!selectAccount || !selectClient || uploadButtonDisabled}
      />
    </HeaderTemplate>
  );
};

export default AllAdsTemplate;
