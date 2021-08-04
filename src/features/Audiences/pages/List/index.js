import React, { useEffect } from 'react';
import service from '@/features/Audiences/service';
import { useQueryParams, useService } from '@/hooks';
import AppMain from '@/components/AppMain';
import PagePagination from '@/components/PagePagination';
import TableView from '@/features/Audiences/components/TableView';
import styles from './styles.module.scss';

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
    setParams({ ...params, currentPage: value || 1 });
  };
  const handleFilterTable = (values) => {
    setParams({ ...params, ...values });
  };

  return (
    <AppMain
      header={(
        <div className={styles.header_title}>
          Аудитория
        </div>
      )}
    >
      <div className={styles.audienceList}>
        <TableView
          data={tableData}
          isFetching={isFetching}
          onFilter={handleFilterTable}
        />

        <PagePagination
          page={pagination?.currentPage || 1}
          numberOfPages={pagination?.totalPages || 1}
          numberOfVisiblePages={5}
          isDisabled={isFetching}
          onChangePage={handleChangePage}
        />
      </div>
    </AppMain>
  );
};

export default AudiencesList;
