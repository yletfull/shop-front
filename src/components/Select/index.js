/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  resetText: PropTypes.string,
  fullwidth: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
};

const defaultProps = {
  className: '',
  resetText: 'Введите текст',
  fullwidth: false,
  placeholder: '',
  type: 'select',
  required: false,
};

const Input = function Input(props) {
  const {
    value, className,
    resetText, fullwidth, options,
    placeholder, type, required, ...attrs
  } = props;

  const currentValue = value || 'default';
  const isDefault = currentValue === 'default';

  return (
    <select
      value={currentValue}
      className={cx(
        styles.select,
        className,
        fullwidth && styles.fullwidth,
        isDefault && styles.default,
        type === 'checkbox' && styles.checkbox
      )}
      placeholder={placeholder}
      {...attrs}
    >
      {!required && (
        <option
          value="default"
          key="default"
          hidden={isDefault}
        >
          {isDefault ? placeholder : resetText}
        </option>
      )}
      {options.map((option, ind) => (
        <option
          key={ind}
          value={option.value}
        >
          {option.text}
        </option>
      ))}
    </select>
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
