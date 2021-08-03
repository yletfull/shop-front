import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { injectReducer } from '@/store';
import { useQuery } from '@/hooks';
import AppMain from '@/components/AppMain';
import Pagination from '@/components/Pagination';
import {
  queryParams,
  mapQueryParams,
  namespace as NS,
} from './constants';
import reducer from './reducer';
import {
  fetchAudiencesList,
} from './actions';
import {
  getAudiencesPagination,
  getFormattedAudienceList,
  getIsFetchingAudiencesList,
} from './selectors';
import TableView from './TableView';
import styles from './styles.module.scss';

const countOptions = [10, 20, 30];

const AudiencesList = function AudiencesList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  const isFetching = useSelector(getIsFetchingAudiencesList);
  const pagination = useSelector(getAudiencesPagination);
  const tableData = useSelector(getFormattedAudienceList);

  const [requestParams, setRequestParams] = useState(Object.values(queryParams)
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

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    console.log('Request Params', requestParams);
    dispatch(fetchAudiencesList(requestParams));
  }, [dispatch, requestParams]);

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
    const params = { ...requestParams, currentPage: value || 1 };
    setRequestParams(params);
    changeQueryParams(params);
  };

  const handleFilterTable = (values) => {
    const params = { ...requestParams, ...values };
    setRequestParams(params);
    changeQueryParams(params);
  };

  const handleCountSelect = (value) => {
    const params = {
      ...requestParams,
      perPage: value,
      currentPage: 1,
    };
    setRequestParams(params);
    changeQueryParams(params);
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

        {pagination && (
          <Pagination
            key="pagination"
            pagesTotal={pagination.totalPages}
            currentPage={pagination.currentPage}
            count={pagination.perPage}
            countOptions={countOptions}
            onPageSelect={handleChangePage}
            onCountSelect={handleCountSelect}
          />
        )}
      </div>
    </AppMain>
  );
};

export default AudiencesList;
