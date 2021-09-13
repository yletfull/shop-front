import React from 'react';
import { useSelector } from 'react-redux';

import ProcessButtonLink from '@/components/ProcessButtonLink';
import HeaderTemplate from '@/components/HeaderTemplate';
import IconDownload from '@/icons/Download';
import { getSelectAccount, getSelectClient } from '@/store/upload/selectors';

import styles from './styles.module.scss';

const AllAdsTemplate = function AllAdsTemplateScreen() {
  const selectAccount = useSelector(getSelectAccount) || '';
  const selectClient = useSelector(getSelectClient) || '';
  const uploadButtonDisabled = useSelector(
    (state) => state.upload?.downloadAllAdsButtonDisabled
  ) ?? true;

  return (
    <HeaderTemplate className={styles.wrapper}>
      <ProcessButtonLink
        icon={<IconDownload />}
        text={['Скачать', 'все объявления']}
        to={`/api/core/v1/import?cabinetId=${selectAccount}&clientId=${selectClient}`}
        target="_blank"
        download
        disabled={!selectAccount || !selectClient || uploadButtonDisabled}
      />
    </HeaderTemplate>
  );
};

export default AllAdsTemplate;
