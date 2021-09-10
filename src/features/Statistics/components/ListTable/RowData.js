import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { formatNumber, formatPercent, formatCTR } from '@/utils/format';
import { TableRow, TableCell } from '@/components/Table';
import NumberGrowth from '@/components/NumberGrowth';
import IconCaretUpSolid from '@/icons/CaretUpSolid';
import IconCaretDownSolid from '@/icons/CaretDownSolid';
import styles from './styles.module.scss';

const metricShape = { diff: PropTypes.number, count: PropTypes.number };
const propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  indexDiff: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  impressions: PropTypes.shape(metricShape).isRequired,
  clicks: PropTypes.shape(metricShape).isRequired,
  ctr: PropTypes.shape(metricShape).isRequired,
  positiveReactions: PropTypes.shape(metricShape).isRequired,
  negativeReactions: PropTypes.shape(metricShape).isRequired,
  repostsReactions: PropTypes.shape(metricShape).isRequired,
  totalReactions: PropTypes.shape(metricShape).isRequired,
  getDetailsLink: PropTypes.func.isRequired,
};

const formatDiff = (value) => formatNumber(Math.abs(value));
const formatPercentDiff = (value) => formatPercent(Math.abs(value));

const RowData = function ListTableRowData({
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
  getDetailsLink,
}) {
  const metrics = [
    { key: 'impressions', values: impressions },
    { key: 'clicks', values: clicks },
    { key: 'ctr', values: ctr, formatter: formatCTR, bordered: true },
    { key: 'positiveReactions', values: positiveReactions },
    { key: 'negativeReactions', values: negativeReactions },
    { key: 'repostsReactions', values: repostsReactions },
    { key: 'totalReactions', values: totalReactions },
  ];

  return (
    <TableRow>
      <TableCell
        key="_index"
        className={styles.index}
        align="right"
      >
        {`${index}.`}
      </TableCell>
      <TableCell key="_name">
        <Link to={getDetailsLink(id)}>
          {name}
        </Link>
      </TableCell>
      <TableCell
        key="_dynamics"
        nowrap
        align="right"
      >
        <NumberGrowth
          className={styles.bodyDiffValue}
          value={indexDiff}
          increaseSign={<IconCaretUpSolid className={styles.diffIcon} />}
          decreaseSign={<IconCaretDownSolid className={styles.diffIcon} />}
          formatter={formatDiff}
        />
      </TableCell>

      {metrics.map((metric) => (
        <Fragment key={metric.key}>
          <TableCell
            nowrap
            align="right"
            className={styles.bodyCount}
          >
            {(metric.formatter || formatNumber)(metric.values?.count || 0)}
          </TableCell>
          <TableCell
            nowrap
            align="right"
            className={cx(
              styles.bodyDiff,
              metric.bordered && styles.borderedCell,
            )}
          >
            <NumberGrowth
              className={styles.bodyDiffValue}
              value={metric.values?.diff || 0}
              formatter={formatPercentDiff}
              decreaseSign="-"
            />
          </TableCell>
        </Fragment>
      ))}
    </TableRow>
  );
};

RowData.propTypes = propTypes;

export default RowData;