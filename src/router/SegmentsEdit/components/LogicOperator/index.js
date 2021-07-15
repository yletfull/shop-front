import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  type: PropTypes.oneOf(['or', 'and']).isRequired,
  className: PropTypes.string,
};
const defaultProps = {
  className: '',
};

const LogicOperator = function LogicOperator({
  type,
  className,
  ...props
}) {
  if (!type) {
    return null;
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        className,
        styles[type],
      )}
      {...props}
    >
      <span className={styles.text}>
        {type === 'or'
          ? 'или'
          : 'и'}
      </span>
    </div>
  );
};

LogicOperator.propTypes = propTypes;
LogicOperator.defaultProps = defaultProps;

export default LogicOperator;
