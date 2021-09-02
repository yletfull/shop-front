import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@/components/Table';
import RowData from './RowData';
import RowFilter from './RowFilter';
import RowHeader from './RowHeader';

const metricShape = { diff: PropTypes.number, count: PropTypes.number };
const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      indexDiff: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      impressions: PropTypes.shape(metricShape).isRequired,
      clicks: PropTypes.shape(metricShape).isRequired,
      ctr: PropTypes.shape(metricShape).isRequired,
      positiveReactions: PropTypes.shape(metricShape).isRequired,
      negativeReactions: PropTypes.shape(metricShape).isRequired,
      repostsReactions: PropTypes.shape(metricShape).isRequired,
      totalReactions: PropTypes.shape(metricShape).isRequired,
    }),
  ).isRequired,
  sort: PropTypes.objectOf(PropTypes.string),
  filters: PropTypes.shape({
    search: PropTypes.string,
  }),
  onFiltersApply: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
const defaultProps = {
  sort: {
    sortDir: 'desc',
    sortField: 'impressions',
  },
  filters: { search: '' },
};

const ListTable = function StatisticsListTable({
  data,
  sort,
  filters,
  onFiltersApply,
  onSortChange,
}) {
  const [search, setSearch] = useState(filters?.search || '');
  useEffect(() => {
    setSearch(filters?.search || '');
  }, [filters]);

  const handleFiltersChange = (fields) => {
    if ('search' in fields) {
      setSearch(fields[search]);
    }
  };
  const handleFiltersApply = (e) => {
    e.preventDefault();
    onFiltersApply({ search });
  };
  const handleSortChange = onSortChange;

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
        {Array.isArray(data) && data.map((row) => (
          <RowData
            {...row}
            key={row.id}
          />
        ))}
      </Table>
    </form>
  );
};

ListTable.propTypes = propTypes;
ListTable.defaultProps = defaultProps;

export default ListTable;
