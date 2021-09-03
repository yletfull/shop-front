import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@/components/Table';
import SortButton from '@/components/SortButton';
import IconRocketSolid from '@/icons/RocketSolid';
import IconDynamics from '@/features/Statistics/icons/Dynamics';
import styles from './styles.module.scss';

const propTypes = {
  sortDir: PropTypes.oneOf(['asc', 'desc']),
  sortField: PropTypes.oneOf([
    'impressions',
    'clicks',
    'ctr',
  ]),
  onSortChange: PropTypes.func,
};
const defaultProps = {
  sortDir: 'desc',
  sortField: 'impressions',
  onSortChange: () => {},
};

const metrics = [
  { field: 'impressions', title: 'Показы' },
  { field: 'clicks', title: 'Клики' },
  { field: 'ctr', title: 'CTR' },
];

const RowHeader = function ListTableSitesRowHeader({
  sortDir,
  sortField,
  onSortChange,
}) {
  const handleSortChange = onSortChange;

  return (
    <TableRow type="header">
      <TableCell
        key="_id"
        width="1"
      />
      <TableCell key="_name">
        Название
      </TableCell>

      <TableCell
        key="_position"
        align="right"
        width="1"
      >
        <IconRocketSolid />
      </TableCell>

      {metrics.map((metric) => (
        <Fragment key={metric.field}>
          <TableCell
            nowrap
            align="right"
            className={styles.headerCount}
          >
            <SortButton
              className={styles.sortButton}
              field={metric.field}
              sortField={sortField}
              sortDir={sortDir}
              defaultSortDir="desc"
              onChange={handleSortChange}
            >
              {metric.title}
            </SortButton>
          </TableCell>
          <TableCell
            align="right"
            width="1"
            className={styles.headerDiff}
          >
            <IconDynamics />
          </TableCell>
        </Fragment>
      ))}
    </TableRow>
  );
};

RowHeader.propTypes = propTypes;
RowHeader.defaultProps = defaultProps;

export default RowHeader;
