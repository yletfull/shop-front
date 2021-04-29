import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';


const cssClass = 'button';

const propTypes = {
  appearance: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
};

const defaultProps = {
  appearance: 'default',
  children: null,
  className: '',
};

const Button = function Button(props) {
  const { appearance, children, className, ...attrs } = props;
  return (
    <button
      type="button"
      className={cx(
        styles[cssClass],
        styles[`${cssClass}_${appearance}`],
        className,
        attrs.disabled && styles.disabled,
      )}
      {...attrs}
    >
      {children}
    </button>

  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
