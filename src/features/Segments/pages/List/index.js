import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useQuery, useService } from '@/hooks';
import { setHeader } from '@/store/ui/actions';
import IconPlus from '@/icons/Plus';
import IconSearch from '@/icons/Search';
import Pagination from '@/components/Pagination';
import service from '@/features/Segments/service';
import {
  queryParams,
  segmentEntityTypes,
} from './constants';
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

  const { fetch, data, isFetching } = useService({
    initialData: {
      data: [],
      meta: {},
    },
    service: service.fetchSegmentsList,
  });

  const querySearchName = query.get(queryParams.searchName) || '';
  const querySearchId = query.get(queryParams.searchId) || '';
  const querySearchNewEntities = query.get(queryParams.searchNewEntities) || '';
  const querySearchVersion = query.get(queryParams.searchVersion) || '';

  const [
    queryCurrentPage,
    setQueryCurrentPage,
  ] = useState(query.get(queryParams.page) || 1);

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  useEffect(() => {
    fetch({
      currentPage: queryCurrentPage,
      id: querySearchId,
      title: querySearchName,
      isNewEntityAvailable: querySearchNewEntities,
      versionCountFrom: querySearchVersion,
      versionCountTo: querySearchVersion,
    });
  }, [
    fetch,
    queryCurrentPage,
    querySearchId,
    querySearchName,
    querySearchNewEntities,
    querySearchVersion,
  ]);

  const tableData = useMemo(() => {
    const mapTableData = (d) => {
      let totalEmailsCount = 0;
      let totalPhonesCount = 0;

      const { entityTypesTotal } = d || {};

      if (entityTypesTotal && Array.isArray(entityTypesTotal)) {
        entityTypesTotal.forEach(({ entityType, total }) => {
          switch (entityType) {
            case segmentEntityTypes.emails:
              totalEmailsCount = total;
              break;
            case segmentEntityTypes.phones:
              totalPhonesCount = total;
              break;
            default:
              break;
          }
        });
      }

      return ({
        ...d,
        totalEmailsCount,
        totalPhonesCount,
      });
    };

    return data.data.map(mapTableData);
  }, [data]);

  const pagination = data?.meta?.pagination || {};

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
