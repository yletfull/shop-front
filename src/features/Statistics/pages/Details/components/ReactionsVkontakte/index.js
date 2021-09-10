import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { formatPercent, formatNumber } from '@/utils/format';
import { useService } from '@/hooks';
import NumberGrowth from '@/components/NumberGrowth';
import IconHeart from '@/icons/Heart';
import IconShare from '@/icons/Share';
import IconWarningOctagon from '@/icons/WarningOctagon';
import WithSpinner from '@/components/WithSpinner';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import ReactionType from '../components/ReactionType';
import service from '../../service';
import Chart from './Chart';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {};

const ReactionsVkontakte = function ReactionsVkontakte({
  dateStart,
  dateEnd,
}) {
  const { entityType, entityId } = useParams();

  const { fetch, data, isFetching, error } = useService({
    initialData: {},
    service: service.fetchReactionsByPlatform,
  });

  const { total = {} } = data;

  useEffect(() => {
    if (!dateStart || !dateEnd) {
      return;
    }
    const params = { dateStart, dateEnd };
    fetch({
      platformId: 'vk',
      entityType,
      entityId,
      params,
    });
  }, [fetch, dateStart, dateEnd, entityType, entityId]);

  const chartData = useMemo(() => {
    const { dynamics } = data;
    if (!dynamics) {
      return ([]);
    }
    return Object.keys(dynamics)
      .map((date) => ({ date, value: dynamics[date] }));
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <WithSpinner
        layout="block"
        isFetching={isFetching}
      >
        {error
          ? <ErrorMessageBlock error={error} />
          : (
            <div>
              <Chart
                data={chartData}
                dateStart={dateStart}
                dateEnd={dateEnd}
              />
              <div className={styles.summary}>
                <div>
                  Реакций за период
                  <span className={styles.summary_indicator} />
                </div>
                <div
                  className={styles.total}
                >
                  <span
                    className={styles.total_count}
                  >
                    {formatNumber(total.count)}
                  </span>
                  <NumberGrowth
                    renderZero
                    value={total.diff || 0}
                    formatter={formatPercent}
                  />
                </div>
              </div>
              <div
                className={styles.reactionTypes}
              >
                <ReactionType
                  icon={<IconHeart />}
                />
                <ReactionType
                  icon={<IconShare />}
                />
                <ReactionType
                  icon={<IconWarningOctagon />}
                />
              </div>
            </div>
          )}
      </WithSpinner>
    </div>
  );
};

ReactionsVkontakte.propTypes = propTypes;
ReactionsVkontakte.defaultProps = defaultProps;

export default ReactionsVkontakte;