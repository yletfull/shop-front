import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import service from '@/features/Audiences/service';
import { useQuery, useService } from '@/hooks';
import AppMain from '@/components/AppMain';
import PagePagination from '@/components/PagePagination';
import { queryParams, mapQueryParams } from '@/features/Audiences/constants';
import TableView from '@/features/Audiences/components/TableView';
import styles from './styles.module.scss';

const AudiencesList = function AudiencesList() {
  const history = useHistory();
  const query = useQuery();

  const [params, setRequestParams] = useState(Object.values(queryParams)
    .reduce((acc, cur) => {
      if (!query.has(cur)) {
        return acc;
      }
      if (cur === queryParams.searchLocal) {
        return ({
          ...acc,
          [mapQueryParams[cur]]: query.get(cur) === 'true',
        });
      }
      return ({
        ...acc,
        [mapQueryParams[cur]]: query.get(cur) || '',
      });
    }, {}));

  const { fetch, data, isFetching } = useService({
    initialData: { data: [], meta: {} },
    service: service.fetchAudiencesList,
  });

  useEffect(() => {
    fetch(params);
  }, [fetch, params]);

  const { data: tableData, meta: tableMeta } = data || {};
  const { pagination } = tableMeta || {};

  const changeQueryParams = (values) => {
    Object.values(queryParams)
      .forEach((key) => {
        if (typeof values[mapQueryParams[key]] === 'undefined') {
          if (query.has(mapQueryParams[key])) {
            query.delete(mapQueryParams[key]);
          }
          return;
        }
        query.set(mapQueryParams[key], values[mapQueryParams[key]]);
      });
    history.push({ search: query.toString() });
  };

  const handleChangePage = (value) => {
    const rparams = { ...params, currentPage: value || 1 };
    setRequestParams(rparams);
    changeQueryParams(rparams);
  };

  const handleFilterTable = (values) => {
    const rparams = { ...params, ...values };
    setRequestParams(rparams);
    changeQueryParams(rparams);
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
