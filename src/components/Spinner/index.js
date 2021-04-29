import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const cssClass = 'u-spinner';

const propTypes = {
  className: PropTypes.string,
  inline: PropTypes.bool,
};

const defaultProps = {
  inline: false,
  className: '',
};

const Input = function Input(props) {
  const {
    inline,
    className,
    ...attrs
  } = props;

  return (
    <div
      className={cx(
        styles[cssClass],
        inline && styles.inline,
        className,
      )}
      {...attrs}
    >
      <div
        className={cx(
          styles[`${cssClass}__circle`],
          inline && styles[`${cssClass}__circle_inline`]
        )}
      />
    </div>

  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
