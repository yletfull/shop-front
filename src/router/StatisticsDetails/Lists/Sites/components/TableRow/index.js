import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { formatNumber, formatPercent } from '@/utils/format';
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
  parentId: PropTypes.string,
  name: PropTypes.string.isRequired,
  impressions: PropTypes.shape(shape).isRequired,
  clicks: PropTypes.shape(shape).isRequired,
  ctr: PropTypes.shape(shape).isRequired,
};

const defaultProps = {
  parentId: null,
};

const StatisticsSitesTableRow = function StatisticsSitesTableRow({
  dateStart,
  dateEnd,
  entity,
  id,
  index,
  indexDiff,
  parentId,
  name,
  impressions,
  clicks,
  ctr,
}) {
  const isNested = Boolean(parentId);
  const searchQuery = new URLSearchParams('');
  searchQuery.set('dateStart', dateStart);
  searchQuery.set('dateEnd', dateEnd);

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

StatisticsSitesTableRow.propTypes = propTypes;
StatisticsSitesTableRow.defaultProps = defaultProps;

export default StatisticsSitesTableRow;