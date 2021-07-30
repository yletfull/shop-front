import React from 'react';
import PropTypes from 'prop-types';
import IconChartLine from '@/icons/ChartLine';
import IconRocket from '@/icons/Rocket';
import IconThumbsUpSolid from '@/icons/ThumbsUpSolid';
import IconThumbsDownSolid from '@/icons/ThumbsDownSolid';
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
  clicks: 'clicks',
  ctr: 'ctr',
  negativeReactions: 'negativeReactions',
  positiveReactions: 'positiveReactions',
  repostsReactions: 'repostsReactions',
  totalReactions: 'totalReactions',
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
    [fields.clicks]: directions.asc,
    [fields.ctr]: directions.asc,
    [fields.negativeReactions]: directions.asc,
    [fields.repostsReactions]: directions.asc,
    [fields.totalReactions]: directions.asc,
    [fields.positiveReactions]: directions.asc,
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
        <IconChartLine className={styles.chart} />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <SortButton
          isActive={sortField === fields.clicks}
          direction={directionByFields[fields.clicks]}
          field={fields.clicks}
          onClick={handleSortClick}
        >
          Клики
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
        <SortButton
          isActive={sortField === fields.ctr}
          direction={directionByFields[fields.ctr]}
          field={fields.ctr}
          onClick={handleSortClick}
        >
          CTR
        </SortButton>
      </TableCell>
      <TableCell
        nowrap
        width="1"
        className={styles.border}
      >
        <IconChartLine className={styles.chart} />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <SortButton
          isActive={sortField === fields.positiveReactions}
          direction={directionByFields[fields.positiveReactions]}
          field={fields.positiveReactions}
          onClick={handleSortClick}
        >
          <IconThumbsUpSolid />
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
        <SortButton
          isActive={sortField === fields.negativeReactions}
          direction={directionByFields[fields.negativeReactions]}
          field={fields.negativeReactions}
          onClick={handleSortClick}
        >
          <IconThumbsDownSolid />
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
        <SortButton
          isActive={sortField === fields.repostsReactions}
          direction={directionByFields[fields.repostsReactions]}
          field={fields.repostsReactions}
          onClick={handleSortClick}
        >
          <IconRetweetAlt />
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
        <SortButton
          isActive={sortField === fields.totalReactions}
          direction={directionByFields[fields.totalReactions]}
          field={fields.totalReactions}
          onClick={handleSortClick}
        >
          Всего
        </SortButton>
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

StatisticsHeader.propTypes = propTypes;
StatisticsHeader.defaultProps = defaultProps;

export default StatisticsHeader;
