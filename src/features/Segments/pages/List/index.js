import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@/hooks';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import IconPlus from '@/icons/Plus';
import IconSearch from '@/icons/Search';
import Pagination from '@/components/Pagination';
import {
  namespace as NS,
  queryParams,
} from './constants';
import reducer from './reducer';
import {
  fetchSegments,
} from './actions';
import {
  getTableData,
  getPagination,
  getIsFetchingData,
} from './selectors';
import Controls from './Controls';
import ControlsLink from './ControlsLink';
import TableView from './TableView';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const SegmentsList = function SegmentsList({ defaultTitle }) {
  const dispatch = useDispatch();

  const history = useHistory();
  const query = useQuery();

  const isFetching = useSelector(getIsFetchingData);
  const tableData = useSelector(getTableData);
  const pagination = useSelector(getPagination);

  const querySearchName = query.get(queryParams.searchName) || '';
  const querySearchId = query.get(queryParams.searchId) || '';
  const querySearchNewEntities = query.get(queryParams.searchNewEntities) || '';
  const querySearchVersion = query.get(queryParams.searchVersion) || '';

  const [
    queryCurrentPage,
    setQueryCurrentPage,
  ] = useState(query.get(queryParams.page) || 1);

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  useEffect(() => {
    dispatch(fetchSegments({
      currentPage: queryCurrentPage,
      id: querySearchId,
      title: querySearchName,
      isNewEntityAvailable: querySearchNewEntities,
      versionCountFrom: querySearchVersion,
      versionCountTo: querySearchVersion,
    }));
  }, [
    dispatch,
    queryCurrentPage,
    querySearchId,
    querySearchName,
    querySearchNewEntities,
    querySearchVersion,
  ]);

  const handleChangePage = (page) => {
    setQueryCurrentPage(page);
    query.set(queryParams.page, String(page));
    history.push({ search: query.toString() });
  };
  const handleSubmitTableFilterForm = ({
    searchId,
    searchName,
    searchNewEntities,
    searchVersion,
  }) => {
    query.set(queryParams.searchId, String(searchId || ''));
    query.set(queryParams.searchName, String(searchName || ''));
    query.set(
      queryParams.searchNewEntities,
      String(['0', '1'].includes(searchNewEntities) ? searchNewEntities : ''),
    );
    query.set(queryParams.searchVersion, String(searchVersion || ''));
    history.push({ search: query.toString() });
  };

  return (
    <div className={styles.segmentsList}>
      <Controls>
        <ControlsLink
          icon={(<IconPlus />)}
          to="/segments/new"
        >
          Новый
          <br />
          сегмент
        </ControlsLink>
        <ControlsLink
          icon={(<IconSearch />)}
          to="/"
        >
          Найти
          <br />
          пользователя
        </ControlsLink>
      </Controls>

      <TableView
        isFetching={isFetching}
        queryParams={queryParams}
        data={tableData}
        onSubmitFilter={handleSubmitTableFilterForm}
      />

      <Pagination
        currentPage={pagination.currentPage}
        pagesTotal={pagination.totalPages || 1}
        onPageSelect={handleChangePage}
      />
    </div>
  );
};

SegmentsList.propTypes = propTypes;
SegmentsList.defaultProps = defaultProps;

export default SegmentsList;
