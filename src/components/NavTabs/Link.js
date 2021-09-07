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
      state: PropTypes.objectOf(PropTypes.any),
    }),
  ]).isRequired,
  exact: PropTypes.bool,
  className: PropTypes.string,
};
const defaultProps = {
  exact: false,
  className: '',
};

const Link = function NavTabsLink({
  children,
  to,
  exact,
  className,
  ...props
}) {
  return (
    <NavLink
      to={to}
      exact={exact}
      className={cx(styles.link, className)}
      activeClassName={styles.active}
      {...props}
    >
      {children}
    </NavLink>
  );
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
