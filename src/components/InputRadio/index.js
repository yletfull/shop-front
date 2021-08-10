import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  id: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func,
};
const defaultProps = {
  className: '',
  style: null,
  id: null,
  value: null,
  checked: null,
  disabled: false,
  children: null,
  onChange: () => {},
};

const InputRadio = function InputRadio({
  className,
  style,
  id,
  value,
  checked,
  disabled,
  children,
  onChange,
  ...props
}) {
  const isChecked = typeof checked === 'string'
    ? value === checked
    : Boolean(checked);
  const handleChange = (e) => {
    if (!e.target.checked) {
      onChange(e, checked);
      return;
    }

    if (typeof checked === 'string') {
      onChange(e, value);
      return;
    }

    // typeof checked === 'boolean'
    onChange(e, e.target.checked);
  };

  return (
    <label
      htmlFor={id}
      className={cx(styles.wrapper, className)}
      style={style}
    >
      <input
        {...props}
        type="radio"
        className={styles.input}
        id={id}
        value={value}
        checked={isChecked}
        onChange={handleChange}
      />
      <span className={styles.box} />

      {Boolean(children) && (
        <span className={styles.label}>
          {children}
        </span>
      )}
    </label>
  );
};

InputRadio.propTypes = propTypes;
InputRadio.defaultProps = defaultProps;

export default InputRadio;
