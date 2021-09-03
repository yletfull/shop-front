import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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

export { default as NavTabLink } from './NavTabLink';

export default NavTabs;
