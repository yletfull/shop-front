import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { colors } from '../constants';
import {
  getReactionsTonalityData,
  getReactionsTonalityMeta,
} from '../selectors';
import Chart from './Chart';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {};

const ReactionsTonality = function ReactionsTonality({
  dateStart,
  dateEnd,
}) {
  const data = useSelector(getReactionsTonalityData);
  const meta = useSelector(getReactionsTonalityMeta);

  return (
    <div className={styles.reactionsTonality}>
      <Chart
        data={data}
        meta={meta}
        dateStart={dateStart}
        dateEnd={dateEnd}
        colors={colors}
      />
    </div>
  );
};

ReactionsTonality.propTypes = propTypes;
ReactionsTonality.defaultProps = defaultProps;

export default ReactionsTonality;
