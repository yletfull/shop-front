import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  as: PropTypes.string,
  layout: PropTypes.oneOf([
    'inline',
    'block',
    'overlay',
  ]),
  className: PropTypes.string,
  spinnerClassName: PropTypes.string,
};
const defaultProps = {
  as: '',
  layout: 'block',
  className: '',
  spinnerClassName: '',
};

const Spinner = function Spinner({
  as,
  layout,
  className,
  spinnerClassName,
  ...props
}) {
  let Tag = as || 'div';

  if (!as && (layout === 'inline')) {
    Tag = 'span';
  }

  return (
    <Tag
      className={cx(
        className,
        styles[layout],
      )}
      {...props}
    >
      <span className={cx(spinnerClassName, styles.spinner)} />
    </Tag>
  );
};

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
