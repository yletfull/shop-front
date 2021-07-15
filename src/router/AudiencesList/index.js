import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import { useQuery } from '@/hooks';
import PagePagination from '@/components/PagePagination';
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

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const AudiencesList = function AudiencesList({ defaultTitle }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();

  const isFetching = useSelector(getIsFetchingAudiencesList);
  const pagination = useSelector(getAudiencesPagination);
  const tableData = useSelector(getFormattedAudienceList);

  const [filterParams, setFilterParams] = useState({});
  const [paginationParams, setPaginationParams] = useState({
    currentPage: query.get(mapQueryParams[queryParams.page]) || 1,
  });

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    dispatch(fetchAudiencesList({
      ...filterParams,
      ...paginationParams,
    }));
  }, [dispatch, filterParams, paginationParams]);

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

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
    const params = {
      ...paginationParams,
      currentPage: value || 1,
    };
    setPaginationParams(params);
    changeQueryParams(params);
  };

  const handleFilterTable = (values) => {
    setFilterParams(values || {});
    changeQueryParams(values || {});
  };

  return (
    <div className={styles.audienceList}>
      <TableView
        data={tableData}
        isFetching={isFetching}
        onFilter={handleFilterTable}
      />

      <PagePagination
        page={pagination.currentPage || 1}
        numberOfPages={pagination.totalPages || 1}
        numberOfVisiblePages={5}
        isDisabled={isFetching}
        onChangePage={handleChangePage}
      />
    </div>
  );
};

AudiencesList.propTypes = propTypes;
AudiencesList.defaultProps = defaultProps;

export default AudiencesList;
