import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';


const cssClass = 'button';

const propTypes = {
  onClick: PropTypes.func,
  appearance: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
};

const defaultProps = {
  onClick: () => {},
  appearance: 'default',
  children: null,
  style: null,
  className: '',
};

const Button = function Button(props) {
  const { onClick, appearance, children, style, className } = props;
  return (
    <button
      type="button"
      style={style && style}
      className={cx(
        styles[cssClass],
        styles[`${cssClass}_${appearance}`],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>

  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
