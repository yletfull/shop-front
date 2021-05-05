import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';


const cssClass = 'button';

const propTypes = {
  appearance: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string,
  ]).isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  appearance: 'default',
  className: '',
  color: 'primary',
};

const Button = function Button(props) {
  const { appearance, children, className, color, ...attrs } = props;

  const childrenArr = Array.isArray(children)
    ? children.map((el) => el)
    : [children];

  return (
    <button
      type="button"
      className={cx(
        styles[cssClass],
        styles[`${cssClass}_${appearance}`],
        styles[`${cssClass}_${color}`],
        className,
        attrs.disabled && styles.disabled,
      )}
      {...attrs}
    >
      {childrenArr.map((child) => child)}
    </button>

  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
