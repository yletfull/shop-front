import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import { useService, useQueryParams } from '@/hooks';
import AppMain from '@/components/AppMain';
import Spinner from '@/components/Spinner';
import Pagination from '@/components/Pagination';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import DateInputs from '@/features/Statistics/components/DateInputs';
import ListTable from '@/features/Statistics/components/ListTable';
import ListTableSites from '@/features/Statistics/components/ListTableSites';
import { entities } from '@/features/Statistics/constants';
import service from '@/features/Statistics/service';
import styles from './styles.module.scss';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      entity: PropTypes.oneOf(Object.values(entities)).isRequired,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

const countOptions = [10, 20, 30];
const navTabsLinks = Object
  .values(entities)
  .map((entity) => ({
    entity,
    title: ({
      [entities.tasks]: 'Задачи',
      [entities.campaigns]: 'ИК',
      [entities.platforms]: 'Площадки',
      [entities.sites]: 'Сайты',
      [entities.spheres]: 'Сферы',
    })[entity] || entity,
  }));
const mapListComponentByEntity = {
  [entities.tasks]: ListTable,
  [entities.campaigns]: ListTable,
  [entities.platforms]: ListTable,
  [entities.sites]: ListTableSites,
  [entities.spheres]: ListTable,
};

const StatisticsList = function StatisticsListScreen({
  match,
  location,
}) {
  const [queryParams, setQueryParams] = useQueryParams();

  const periodsService = useService({
    initialData: [],
    service: service.fetchPeriods,
  });
  const fetchPeriods = periodsService.fetch;
  useEffect(() => {
    fetchPeriods();
  }, [fetchPeriods]);
  const {
    datestart: minDate,
    dateend: maxDate,
  } = periodsService.data[0] || {};

  const { fetch, data: response, isFetching, error } = useService({
    initialData: {},
    service: service.fetchList,
  });

  const handleDateInputsSubmit = ({ dateStart, dateEnd }) => {
    setQueryParams({
      dateStart,
      dateEnd,
      currentPage: 1,
    });
  };
  const handlePageSelect = (currentPage) => setQueryParams({ currentPage });
  const handleCountSelect = (perPage) => {
    setQueryParams({
      perPage,
      currentPage: 1,
    });
  };
  const handleFiltersApply = (values) => {
    setQueryParams({
      search: values.search,
      currentPage: 1,
    });
  };
  const handleSortChange = ({ sortDir, sortField }) => {
    setQueryParams({ sortDir, sortField });
  };

  const { entity } = match?.params || {};
  const {
    dateStart,
    dateEnd,
    search,
    sortDir,
    sortField,
    currentPage,
    perPage,
  } = queryParams;
  useEffect(() => {
    if (!entity || !dateStart || !dateEnd) {
      return;
    }

    fetch({
      entity,
      dateStart,
      dateEnd,
      search,
      sortDir: sortDir || 'desc',
      sortField: sortField || 'impressions',
      currentPage: currentPage || 1,
      perPage: perPage || countOptions[0],
    });
  }, [
    entity,
    fetch,
    dateStart,
    dateEnd,
    search,
    sortDir,
    sortField,
    currentPage,
    perPage,
  ]);
  useEffect(() => {
    if (!maxDate || (dateStart && dateEnd)) {
      return;
    }

    setQueryParams({
      dateStart: maxDate,
      dateEnd: maxDate,
    });
  }, [maxDate, dateStart, dateEnd, setQueryParams]);

  const { data, meta } = response || {};
  const filters = { search };
  const getDetailsLink = (id) => (
    `/statistics/details/${entity}/${id}${location.search}`
  );

  const ListComponent = mapListComponentByEntity[entity] || ListTable;

  return (
    <AppMain
      header={(
        <div className={styles.header}>
          <div className={styles.header_title}>
            Статистика
          </div>
          <DateInputs
            className={styles.dateInputs}
            min={minDate}
            max={maxDate}
            values={{ dateStart, dateEnd }}
            onChange={handleDateInputsSubmit}
            onShift={handleDateInputsSubmit}
            onSelect={handleDateInputsSubmit}
          />
          {periodsService.isFetching && <Spinner layout="inline" />}
        </div>
      )}
    >
      <div
        className={cx([
          styles.navigation,
          'nav-links-wrapper',
        ])}
      >
        {navTabsLinks.map((link) => (
          <NavLink
            key={link.entity}
            to={{
              pathname: `/statistics/lists/${link.entity}`,
              search: location?.search || '',
            }}
            className="link-class_nav"
            activeClassName="active-link-class_nav"
          >
            {link.title}
          </NavLink>
        ))}
      </div>

      <div className={styles.page}>
        {(isFetching || periodsService.isFetching) && (
          <Spinner
            spinnerClassName={styles.spinner}
            layout="overlay"
          />
        )}

        {error && (
          <ErrorMessageBlock
            key="error-message"
            error={error}
          />
        )}

        <ListComponent
          data={data}
          sort={meta?.sort}
          filters={filters}
          getDetailsLink={getDetailsLink}
          onFiltersApply={handleFiltersApply}
          onSortChange={handleSortChange}
        />
        <Pagination
          key="pagination"
          pagesTotal={meta?.pagination?.totalPages || 1}
          currentPage={meta?.pagination?.currentPage || 1}
          count={meta?.pagination?.perPage}
          countOptions={countOptions}
          onPageSelect={handlePageSelect}
          onCountSelect={handleCountSelect}
        />
      </div>
    </AppMain>
  );
};

StatisticsList.propTypes = propTypes;

export default StatisticsList;
