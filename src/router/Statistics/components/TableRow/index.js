import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@/utils/format';
import { TableRow, TableCell } from '@/components/Table';
import NumberGrowth from '@/components/NumberGrowth';
import IconCaretUp from '@/icons/CaretUp';
import IconCaretDown from '@/icons/CaretDown';
import styles from './styles.module.scss';

const shape = {
  diff: PropTypes.number,
  count: PropTypes.number,
};

const propTypes = {
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
  return (
    <TableRow>
      <TableCell
        className={styles.index}
      >
        {`${index}.`}
      </TableCell>
      <TableCell>
        {name}
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <NumberGrowth
          value={indexDiff}
          increaseSign={<IconCaretUp />}
          decreaseSign={<IconCaretDown />}
          formatter={formatNumber}
        />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        {formatNumber(impressions.count)}
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        {impressions.diff}
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        {formatNumber(clicks.count)}
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        {clicks.diff}
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        {ctr.count}
      </TableCell>
      <TableCell
        nowrap
        width="1"
        className={styles.border}
      >
        {ctr.diff}
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        {formatNumber(positiveReactions.count)}
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        {positiveReactions.diff}
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        {formatNumber(negativeReactions.count)}
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        {negativeReactions.diff}
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        {formatNumber(repostsReactions.count)}
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        {repostsReactions.diff}
      </TableCell>
      <TableCell
        align="right"
        nowrap
        width="1"
      >
        {formatNumber(totalReactions.count)}
      </TableCell>
      <TableCell
        align="right"
        nowrap
        width="1"
      >
        {totalReactions.diff}
      </TableCell>
    </TableRow>
  );
};

StatisticsTableRow.propTypes = propTypes;

export default StatisticsTableRow;
