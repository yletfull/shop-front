import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import IconCheck from '@/icons/Check';
import styles from './styles.module.scss';

const propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  id: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  children: PropTypes.node,
  onChange: PropTypes.func,
};

const defaultProps = {
  className: '',
  style: null,
  id: null,
  value: '',
  disabled: false,
  checked: false,
  children: null,
  onChange: () => {},
};

const computeIsChecked = (checked, value) => {
  if (Array.isArray(checked)) {
    return checked.includes(value);
  }

  if (typeof checked === 'string') {
    return checked === value;
  }

  return checked;
};

const Checkbox = function Checkbox({
  className,
  style,
  id,
  value,
  disabled,
  checked,
  children,
  onChange,
  ...props
}) {
  const isChecked = computeIsChecked(checked, value);
  const handleChange = (e) => {
    const nextChecked = e.target.checked;

    if (Array.isArray(checked)) {
      onChange(
        nextChecked
          ? [...checked, value]
          : checked.filter((d) => d !== value),
        e,
      );
      return;
    }

    if (typeof checked === 'string' && nextChecked) {
      onChange(value, e);
      return;
    }

    // typeof checked === 'boolean'
    onChange(nextChecked, e);
  };

  return (
    <label
      htmlFor={id}
      className={cx(className, styles.wrapper)}
      style={style}
    >
      <input
        {...props}
        id={id}
        className={styles.input}
        type="checkbox"
        value={value}
        disabled={disabled}
        checked={isChecked}
        onChange={handleChange}
      />
      <span className={styles.box}>
        <IconCheck className={styles.icon} />
      </span>

      {Boolean(children) && (
        <span className={styles.label}>
          {children}
        </span>
      )}
    </label>
  );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
