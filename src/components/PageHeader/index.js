import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  children: null,
  className: null,
};

const PageHeader = function PageHeader({
  children,
  className,
  ...props
}) {
  return (
    <h1
      className={cx(styles.pageHeader, className)}
      {...props}
    >
      {children}
    </h1>
  );
};

PageHeader.propTypes = propTypes;
PageHeader.defaultProps = defaultProps;

export default PageHeader;
