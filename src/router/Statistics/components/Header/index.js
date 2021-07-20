import React from 'react';
import PropTypes from 'prop-types';
import IconArrowChart from '@/icons/ArrowChart';
import IconRocket from '@/icons/Rocket';
import IconThumbsUp from '@/icons/ThumbsUp';
import IconThumbsDown from '@/icons/ThumbsDown';
import IconRetweetAlt from '@/icons/RetweetAlt';
import { TableRow, TableCell } from '@/components/Table';
import SortButton from '../SortButton';
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

const StatisticsHeader = function StatisticsHeader({
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
        <IconRocket />
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
        <IconArrowChart className={styles.chart} />
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
        <IconArrowChart className={styles.chart} />
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
        className={styles.border}
      >
        <IconArrowChart className={styles.chart} />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconThumbsUp />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconArrowChart className={styles.chart} />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconThumbsDown />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconArrowChart className={styles.chart} />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconRetweetAlt />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconArrowChart className={styles.chart} />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        Всего
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <IconArrowChart className={styles.chart} />
      </TableCell>
    </TableRow>
  );
};

StatisticsHeader.propTypes = propTypes;
StatisticsHeader.defaultProps = defaultProps;

export default StatisticsHeader;
