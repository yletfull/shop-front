import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '@/components/Table';
import EmptyTableRow from '../EmptyTableRow';
import Header from './components/Header';
import FilterRow from './components/FilterRow';
import TableRow from './components/TableRow';

const shape = {
  diff: PropTypes.number,
  count: PropTypes.number,
};

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  entity: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      indexDiff: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      impressions: PropTypes.shape(shape).isRequired,
      clicks: PropTypes.shape(shape).isRequired,
      ctr: PropTypes.shape(shape).isRequired,
      positiveReactions: PropTypes.shape(shape).isRequired,
      negativeReactions: PropTypes.shape(shape).isRequired,
      repostsReactions: PropTypes.shape(shape).isRequired,
      totalReactions: PropTypes.shape(shape).isRequired,
    })
  ),
  sort: PropTypes.shape({
    sortDir: PropTypes.string.isRequired,
    sortField: PropTypes.string.isRequired,
  }),
  filter: PropTypes.shape({
    search: PropTypes.string,
  }),
  onFilterChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
  filter: {
    search: '',
  },
  list: null,
  sort: null,
};

const StatisticsList = function StatisticsList({
  dateStart,
  dateEnd,
  entity,
  list,
  sort,
  filter,
  onFilterChange,
  onFormSubmit,
  onSortChange,
}) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(filter);
  };

  const handleSortChange = (value) => {
    onSortChange(value);
  };

  const handleFilterChange = (values) => {
    onFilterChange(values);
  };

  return (
    <form
      key="form"
      onSubmit={handleFormSubmit}
    >
      <Table
        header={(
          <Fragment>
            <FilterRow
              values={filter}
              onChange={handleFilterChange}
            />
            <Header
              sortDir={sort?.sortDir}
              sortField={sort?.sortField}
              onSortChange={handleSortChange}
            />
          </Fragment>
        )}
      >
        {Array.isArray(list) && (
          <Fragment>
            {list.map((item) => (
              <TableRow
                dateStart={dateStart}
                dateEnd={dateEnd}
                key={item.id}
                entity={entity}
                id={item.id}
                index={item.index}
                indexDiff={item.indexDiff}
                name={item.name}
                impressions={item.impressions}
                clicks={item.clicks}
                ctr={item.ctr}
                positiveReactions={item.positiveReactions}
                negativeReactions={item.negativeReactions}
                repostsReactions={item.repostsReactions}
                totalReactions={item.totalReactions}
              />
            ))}
            {(list.length === 0) && (
              <EmptyTableRow colSpan={17} />
            )}
          </Fragment>
        )}
      </Table>
    </form>
  );
};

StatisticsList.propTypes = propTypes;
StatisticsList.defaultProps = defaultProps;

export default StatisticsList;
