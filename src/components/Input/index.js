/* eslint-disable react/no-array-index-key */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const cssClass = 'input';

const propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  fullwidth: PropTypes.bool,
};

const defaultProps = {
  className: '',
  placeholder: 'Введите текст',
  fullwidth: false,
};

const Input = forwardRef((props, ref) => {
  const {
    className, placeholder, fullwidth,
    ...attrs
  } = props;

  return (
    <input
      ref={ref}
      className={cx(
        styles[cssClass],
        className,
        fullwidth && styles.fullwidth,
      )}
      placeholder={placeholder}
      {...attrs}
    />
  );
});

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
