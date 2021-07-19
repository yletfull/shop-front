import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { formatNumber, formatPercent } from '@/utils/format';
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
  parentId: PropTypes.string,
  name: PropTypes.string.isRequired,
  impressions: PropTypes.shape(shape).isRequired,
  clicks: PropTypes.shape(shape).isRequired,
  ctr: PropTypes.shape(shape).isRequired,
};

const defaultProps = {
  parentId: null,
};

const StatisticsTableRow = function StatisticsTableRow({
  index,
  indexDiff,
  parentId,
  name,
  impressions,
  clicks,
  ctr,
}) {
  const isNested = Boolean(parentId);

  return (
    <TableRow
      className={cx({
        [styles.nested]: isNested,
      })}
    >
      <TableCell
        className={styles.index}
      >
        {`${index}.`}
      </TableCell>
      <TableCell
        className={styles.name}
      >
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
        <NumberGrowth
          value={impressions.diff}
          increaseSign="+"
          decreaseSign="-"
          formatter={formatPercent}
        />
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
        <NumberGrowth
          value={clicks.diff}
          increaseSign="+"
          decreaseSign="-"
          formatter={formatPercent}
        />
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        {formatNumber(ctr.count)}
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <NumberGrowth
          value={ctr.diff}
          increaseSign="+"
          decreaseSign="-"
          formatter={formatPercent}
        />
      </TableCell>
    </TableRow>
  );
};

StatisticsTableRow.propTypes = propTypes;
StatisticsTableRow.defaultProps = defaultProps;

export default StatisticsTableRow;
