/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string,
  resetText: PropTypes.string,
  fullwidth: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

const defaultProps = {
  onChange: () => {},
  style: null,
  className: '',
  resetText: 'Введите текст',
  fullwidth: false,
  placeholder: '',
  disabled: false,
};

const Input = function Input(props) {
  const {
    value, onChange, style, className,
    resetText, fullwidth, options,
    placeholder, disabled,
  } = props;

  const currentValue = value || 'default';
  const isDefault = currentValue === 'default';

  return (
    <select
      onChange={onChange}
      value={currentValue}
      className={cx(
        styles.select,
        className,
        fullwidth && styles.fullwidth,
        isDefault && styles.default
      )}
      style={style}
      placeholder={placeholder}
      disabled={disabled}
    >
      <option
        value="default"
        key="default"
        hidden={isDefault}
      >
        {isDefault ? placeholder : resetText}
      </option>

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
