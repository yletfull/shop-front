import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { formatPercent, formatNumber } from '@/utils/format';
import { useService } from '@/hooks';
import NumberGrowth from '@/components/NumberGrowth';
import IconHeart from '@/icons/Heart';
import IconPaperPlaneTilt from '@/icons/PaperPlaneTilt';
import IconSave from '@/icons/Save';
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

const ReactionsInstagram = function ReactionsInstagram({
  dateStart,
  dateEnd,
}) {
  const { entityType, id: entityId } = useParams();

  const { fetch, data, error } = useService({
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
      platformId: 'ig',
      entityType,
      entityId,
      params,
    });
  }, [fetch, dateStart, dateEnd, entityType, entityId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mocks = {
    dynamics: {
      '2021-07-20': 0,
      '2021-07-21': 0,
      '2021-07-22': 0,
      '2021-07-23': 0,
      '2021-07-24': 85,
      '2021-07-25': 93,
      '2021-07-26': 100,
      '2021-07-27': 96,
      '2021-07-28': 114,
      '2021-07-29': 96,
      '2021-07-30': 56,
      '2021-07-31': 48,
      '2021-08-01': 5,
      '2021-08-02': 14,
      '2021-08-11': 153,
      '2021-08-12': 137,
      '2021-08-13': 194,
      '2021-08-14': 135,
      '2021-08-15': 288,
      '2021-08-16': 275,
      '2021-08-17': 425,
    },
    total: {
      count: 2846,
      diff: -0.03,
    },
  };

  const chartData = useMemo(() => {
    const { dynamics } = mocks;
    if (!dynamics) {
      return ([]);
    }

    return Object.keys(dynamics)
      .map((date) => ({ date, value: dynamics[date] }));
  }, [mocks]);


  return (
    <div className={styles.wrapper}>
      <WithSpinner
        layout="block"
        isFetching={false}
      >
        {error
          ? <ErrorMessageBlock error={error} />
          : (
            <div>
              {Object.keys(chartData).length
                ? (
                  <React.Fragment>
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
                        icon={<IconPaperPlaneTilt />}
                      />
                      <ReactionType
                        icon={<IconSave />}
                      />
                    </div>
                  </React.Fragment>
                )
                : (
                  <span>
                    Нет данных за период
                  </span>
                )}

            </div>
          )}
      </WithSpinner>
    </div>
  );
};

ReactionsInstagram.propTypes = propTypes;
ReactionsInstagram.defaultProps = defaultProps;

export default ReactionsInstagram;
