import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
      hash: PropTypes.string,
      state: PropTypes.objectOf(PropTypes.any),
    }),
  ]).isRequired,
  exact: PropTypes.bool,
  replace: PropTypes.bool,
  className: PropTypes.string,
};
const defaultProps = {
  exact: false,
  replace: false,
  className: '',
};

const Link = function NavTabsLink({
  children,
  to,
  exact,
  replace,
  className,
  ...props
}) {
  return (
    <NavLink
      to={to}
      exact={exact}
      replace={replace}
      className={cx(styles.link, className)}
      activeClassName={styles.active}
      {...props}
    >
      {children}
    </NavLink>
  );
};

Link.displayName = 'NavTabs.Link';
Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
