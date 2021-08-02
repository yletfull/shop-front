import React from 'react';
import PropTypes from 'prop-types';
import IconChartLine from '@/icons/ChartLine';
import IconRocketSolid from '@/icons/RocketSolid';
import { TableRow, TableCell } from '@/components/Table';
import SortButton from '@/router/Statistics/components/SortButton';
import styles from './styles.module.scss';

const directions = {
  asc: 'asc',
  desc: 'desc',
};

const fields = {
  impressions: 'impressions',
};

const propTypes = {
  sortField: PropTypes.string,
  sortDir: PropTypes.string,
  onSortChange: PropTypes.func,
};

const defaultProps = {
  sortField: '',
  sortDir: '',
  onSortChange: () => {},
};

const StatisticsSitesHeader = function StatisticsSitesHeader({
  sortField,
  sortDir,
  onSortChange,
}) {
  const directionByFields = {
    [fields.impressions]: directions.asc,
    [sortField]: sortDir,
  };

  const handleSortClick = (values) => {
    onSortChange(values);
  };

  return (
    <TableRow
      type="header"
    >
      <TableCell width="1" />
      <TableCell>
        Название
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconRocketSolid />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <SortButton
          isActive={sortField === fields.impressions}
          direction={directionByFields[fields.impressions]}
          field={fields.impressions}
          onClick={handleSortClick}
        >
          Показы
        </SortButton>
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconChartLine className={styles.chart} />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        Клики
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconChartLine className={styles.chart} />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        CTR
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconChartLine className={styles.chart} />
      </TableCell>
    </TableRow>
  );
};

StatisticsSitesHeader.propTypes = propTypes;
StatisticsSitesHeader.defaultProps = defaultProps;

export default StatisticsSitesHeader;
