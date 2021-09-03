import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@/components/Table';
import RowData from './RowData';
import RowFilter from './RowFilter';
import RowHeader from './RowHeader';
import RowEmpty from './RowEmpty';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  sort: PropTypes.objectOf(PropTypes.string),
  filters: PropTypes.shape({
    search: PropTypes.string,
  }),
  getDetailsLink: PropTypes.func.isRequired,
  forceIsEmpty: PropTypes.bool,
  onFiltersApply: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
const defaultProps = {
  sort: {
    sortDir: 'desc',
    sortField: 'impressions',
  },
  filters: { search: '' },
  forceIsEmpty: false,
};

const ListTableSites = function StatisticsListTableSites({
  data,
  sort,
  filters,
  getDetailsLink,
  forceIsEmpty,
  onFiltersApply,
  onSortChange,
}) {
  const [search, setSearch] = useState(filters?.search || '');
  useEffect(() => {
    setSearch(filters?.search || '');
  }, [filters]);

  const handleFiltersChange = (fields) => {
    if ('search' in fields) {
      setSearch(fields.search);
    }
  };
  const handleFiltersApply = (e) => {
    e.preventDefault();
    onFiltersApply({ search });
  };
  const handleSortChange = onSortChange;

  const isEmpty = forceIsEmpty || (Array.isArray(data) && !data.length);

  return (
    <form
      action="."
      method="get"
      onSubmit={handleFiltersApply}
    >
      <Table
        header={(
          <Fragment>
            <RowFilter
              search={search}
              onChange={handleFiltersChange}
            />
            <RowHeader
              sortField={sort?.sortField}
              sortDir={sort?.sortDir}
              onSortChange={handleSortChange}
            />
          </Fragment>
        )}
      >
        {(Array.isArray(data) && !isEmpty) && data.map((row) => (
          <RowData
            {...row}
            key={row.id}
            getDetailsLink={getDetailsLink}
          />
        ))}
        {isEmpty && (
          <RowEmpty />
        )}
      </Table>
    </form>
  );
};

ListTableSites.propTypes = propTypes;
ListTableSites.defaultProps = defaultProps;

export default ListTableSites;
