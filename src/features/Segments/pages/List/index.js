import React, { useEffect, useMemo } from 'react';
import { useQueryParams, useService } from '@/hooks';
import IconPlus from '@/icons/Plus';
import IconSearch from '@/icons/Search';
import AppMain from '@/components/AppMain';
import Pagination from '@/components/Pagination';
import WithSpinner from '@/components/WithSpinner';
import ControlsLink from '@/features/Segments/components/ControlsLink';
import TableView from '@/features/Segments/components/TableView';
import service from '@/features/Segments/service';
import { segmentEntityTypes } from '@/features/Segments/constants';
import styles from './styles.module.scss';

const countOptions = [10, 20, 30];

const propTypes = {};
const defaultProps = {};

const SegmentsList = function SegmentsList() {
  const [params, setParams] = useQueryParams();

  const { fetch, data, isFetching } = useService({
    initialData: {
      data: [],
      meta: {},
    },
    service: service.fetchSegmentsList,
  });

  useEffect(() => {
    fetch(params);
  }, [fetch, params]);

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

  const { pagination } = data?.meta || {};

  const handleChangePage = (value) => {
    if (!value || value < 0) {
      return;
    }
    setParams({ currentPage: value });
  };

  const handleCountSelect = (value) => {
    if (!value || value < 0) {
      return;
    }
    setParams({
      currentPage: 1,
      perPage: value,
    });
  };

  const handleSubmitTableFilterForm = ({
    searchId,
    searchName,
    searchNewEntities,
    searchVersion,
  }) => {
    setParams({
      id: String(searchId),
      title: searchName,
      isNewEntityAvailable: String(['0', '1'].includes(searchNewEntities)
        ? searchNewEntities
        : ''),
      versionCountFrom: String(searchVersion),
      versionCountTo: String(searchVersion),
    });
  };

  return (
    <AppMain
      header={(
        <span>
          Сегменты
        </span>
      )}
    >
      <div className={styles.segmentsList}>
        <div className={styles.segmentsListControls}>
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
            to="/segments/user"
          >
            Найти
            <br />
            пользователя
          </ControlsLink>
        </div>
        <div className={styles.wrapper}>
          <WithSpinner
            layout="overlay"
            isFetching={isFetching}
            className={styles.spinnerOverlay}
          />
          <TableView
            isFetching={isFetching}
            data={tableData}
            onSubmitFilter={handleSubmitTableFilterForm}
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
      </div>
    </AppMain>
  );
};

SegmentsList.propTypes = propTypes;
SegmentsList.defaultProps = defaultProps;

export default SegmentsList;
