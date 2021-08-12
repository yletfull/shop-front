import React, { useEffect } from 'react';
import service from '@/features/Audiences/service';
import { useQueryParams, useService } from '@/hooks';
import AppMain from '@/components/AppMain';
import PageHeader from '@/components/PageHeader';
import WithSpinner from '@/components/WithSpinner';
import Pagination from '@/components/Pagination';
import TableView from '@/features/Audiences/components/TableView';
import styles from './styles.module.scss';

const countOptions = [10, 20, 30];

const AudiencesList = function AudiencesList() {
  const [params, setParams] = useQueryParams();

  const { fetch, data, isFetching } = useService({
    initialData: { data: [], meta: {} },
    service: service.fetchAudiencesList,
  });

  useEffect(() => {
    fetch(params);
  }, [fetch, params]);

  const { data: tableData, meta: tableMeta } = data || {};
  const { pagination } = tableMeta || {};

  const handleChangePage = (value) => {
    if (!value || value < 0) {
      return;
    }
    setParams({ ...params, currentPage: value });
  };
  const handleCountSelect = (value) => {
    if (!value || value < 0) {
      return;
    }
    setParams({ ...params, perPage: value });
  };
  const handleFilterTable = (values) => {
    setParams({ ...params, ...values });
  };

  return (
    <AppMain
      header={(
        <PageHeader>
          Аудитории
        </PageHeader>
      )}
    >
      <div className={styles.audiencesList}>
        <WithSpinner
          layout="overlay"
          isFetching={isFetching}
        />

        <TableView
          data={tableData}
          onFilter={handleFilterTable}
        />

        <Pagination
          currentPage={pagination?.currentPage || 1}
          pagesTotal={pagination?.totalPages || 1}
          count={pagination?.perPage || countOptions[0]}
          countOptions={countOptions}
          onPageSelect={handleChangePage}
          onCountSelect={handleCountSelect}
        />
      </div>
    </AppMain>
  );
};

export default AudiencesList;
