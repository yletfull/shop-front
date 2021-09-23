import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { formatPercent, formatNumber } from '@/utils/format';
import { useService } from '@/hooks';
import NumberGrowth from '@/components/NumberGrowth';
import angry from '@/images/facebook/angry.svg';
import care from '@/images/facebook/care.svg';
import haha from '@/images/facebook/haha.svg';
import like from '@/images/facebook/like.svg';
import love from '@/images/facebook/love.svg';
import sad from '@/images/facebook/sad.svg';
import wow from '@/images/facebook/wow.svg';
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

const ReactionsFacebook = function ReactionsFacebook({
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
      platformId: 'fb',
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
                        icon={(
                          <img
                            alt="like"
                            src={like}
                          />
                        )}
                      />
                      <ReactionType
                        icon={(
                          <img
                            alt="love"
                            src={love}
                          />
                        )}
                      />
                      <ReactionType
                        icon={(
                          <img
                            alt="care"
                            src={care}
                          />
                        )}
                      />
                      <ReactionType
                        icon={(
                          <img
                            alt="haha"
                            src={haha}
                          />
                        )}
                      />
                      <ReactionType
                        icon={(
                          <img
                            alt="wow"
                            src={wow}
                          />
                        )}
                      />
                      <ReactionType
                        icon={(
                          <img
                            alt="sad"
                            src={sad}
                          />
                        )}
                      />
                      <ReactionType
                        icon={(
                          <img
                            alt="angry"
                            src={angry}
                          />
                        )}
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

ReactionsFacebook.propTypes = propTypes;
ReactionsFacebook.defaultProps = defaultProps;

export default ReactionsFacebook;
