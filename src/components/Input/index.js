/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const cssClass = 'input';

const propTypes = {
  onInput: PropTypes.func,
  value: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  fullwidth: PropTypes.bool,
};

const defaultProps = {
  onInput: () => {},
  style: null,
  className: '',
  placeholder: 'Введите текст',
  fullwidth: false,
};

const Input = function Input(props) {
  const { value, onInput, style, className, placeholder, fullwidth } = props;

  return (
    <input
      style={style && style}
      className={cx(
        styles[cssClass],
        className,
        fullwidth && styles.fullwidth,
      )}
      placeholder={placeholder}
      onInput={onInput}
      value={value}
    />
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
