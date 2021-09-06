import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from './Link';
import Button from './Button';
import styles from './styles.module.scss';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
const defaultProps = {
  className: '',
  children: null,
};

const NavTabs = function NavTabs(
  { className, children, ...props }
) {
  return (
    <div
      {...props}
      className={cx(styles.wrapper, className)}
    >
      {children}
    </div>
  );
};

NavTabs.propTypes = propTypes;
NavTabs.defaultProps = defaultProps;
NavTabs.Link = Link;
NavTabs.Button = Button;

export default NavTabs;
