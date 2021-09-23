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
import ReactionType from '../ReactionType';
import service from '../../service';
import SocialChart from '../SocialChart';
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
      platformId: 'ig',
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
              {Object.keys(chartData).length
                ? (
                  <React.Fragment>
                    <SocialChart
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
