import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const defaultProps = {};

const ReactionsComments = function ReactionsComments({
  dateStart,
  dateEnd,
}) {
  console.log(dateStart, dateEnd);
  return (
    <div className={styles.wrapper}>
      ReactionsComments
    </div>
  );
};

ReactionsComments.propTypes = propTypes;
ReactionsComments.defaultProps = defaultProps;

export default ReactionsComments;
