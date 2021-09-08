import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatNumber, formatPercent, formatCTR } from '@/utils/format';
import { TableRow, TableCell } from '@/components/Table';
import NumberGrowth from '@/components/NumberGrowth';
import IconCaretUpSolid from '@/icons/CaretUpSolid';
import IconCaretDownSolid from '@/icons/CaretDownSolid';
import styles from './styles.module.scss';

const formatIndexDiff = (value) => formatNumber(Math.abs(value));

const shape = {
  diff: PropTypes.number,
  count: PropTypes.number,
};

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  entity: PropTypes.string.isRequired,
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
  dateStart,
  dateEnd,
  entity,
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
  const searchQuery = new URLSearchParams('');
  searchQuery.set('dateStart', dateStart);
  searchQuery.set('dateEnd', dateEnd);

  return (
    <TableRow>
      <TableCell
        className={styles.index}
      >
        {`${index}.`}
      </TableCell>
      <TableCell>
        <Link
          to={{
            pathname: `/statistics/details/${entity}/${id}`,
            search: searchQuery.toString(),
          }}
        >
          {name}
        </Link>
      </TableCell>
      <TableCell
        nowrap
        width="1"
      >
        <NumberGrowth
          value={indexDiff}
          increaseSign={<IconCaretUpSolid />}
          decreaseSign={<IconCaretDownSolid />}
          formatter={formatIndexDiff}
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
        {formatCTR(ctr.count)}
      </TableCell>
      <TableCell
        nowrap
        width="1"
        className={styles.border}
      >
        <NumberGrowth
          value={ctr.diff}
          increaseSign="+"
          decreaseSign="-"
          formatter={formatPercent}
        />
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
        <NumberGrowth
          value={positiveReactions.diff}
          increaseSign="+"
          decreaseSign="-"
          formatter={formatPercent}
        />
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
        <NumberGrowth
          value={negativeReactions.diff}
          increaseSign="+"
          decreaseSign="-"
          formatter={formatPercent}
        />
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
        <NumberGrowth
          value={repostsReactions.diff}
          increaseSign="+"
          decreaseSign="-"
          formatter={formatPercent}
        />
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
        <NumberGrowth
          value={totalReactions.diff}
          increaseSign="+"
          decreaseSign="-"
          formatter={formatPercent}
        />
      </TableCell>
    </TableRow>
  );
};

StatisticsTableRow.propTypes = propTypes;

export default StatisticsTableRow;
