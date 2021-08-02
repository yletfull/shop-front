import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  className: PropTypes.string,
  fullwidth: PropTypes.bool,
};

const defaultProps = {
  className: '',
  fullwidth: false,
};

const InputTextarea = forwardRef((props, ref) => {
  const {
    className,
    fullwidth,
    ...attrs
  } = props;

  return (
    <textarea
      ref={ref}
      className={cx(
        styles.textarea,
        className,
        fullwidth && styles.fullwidth,
      )}
      {...attrs}
    />
  );
});

InputTextarea.propTypes = propTypes;
InputTextarea.defaultProps = defaultProps;

export default InputTextarea;
