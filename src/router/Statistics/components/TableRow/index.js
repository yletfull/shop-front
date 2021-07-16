import React from 'react';
import PropTypes from 'prop-types';
import IconArrowChart from '@/icons/ArrowChart';
import IconRocket from '@/icons/Rocket';
import IconThumbsUp from '@/icons/ThumbsUp';
import IconThumbsDown from '@/icons/ThumbsDown';
import IconRetweetAlt from '@/icons/RetweetAlt';
import IconCaretDown from '@/icons/CaretDown';
import { TableRow, TableCell } from '@/components/Table';
import styles from './styles.module.scss';

const shape = {
  diff: PropTypes.number,
  count: PropTypes.number,
};

const propTypes = {
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
};

const StatisticsTableRow = function StatisticsTableRow({
  id,
  index,
  indexDiff,
  name,
  impressions,
  clicks,
  ctr,
  positiveReactions,
  negativeReactions,
  repostsReactions,
  totalReactions,
}) {
  console.log({
    id,
    index,
    indexDiff,
    name,
    impressions,
    clicks,
    ctr,
    positiveReactions,
    negativeReactions,
    repostsReactions,
    totalReactions,
  });
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
        <button
          type="button"
          className={styles.screenings}
        >
          Показы
          <IconCaretDown
            className={styles.screenings_icon}
          />
        </button>
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

StatisticsTableRow.propTypes = propTypes;

export default StatisticsTableRow;
