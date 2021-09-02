import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

const propTypes = {
  title: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};
const defaultProps = {
  exact: false,
};

const NavTabsLink = function NavTabsLink(
  { title, path, exact, ...attrs }
) {
  return (
    <NavLink
      key={path}
      to={path}
      exact={exact || false}
      className={styles.link}
      activeClassName={styles.active}
      {...attrs}
    >
      {title}
    </NavLink>

  );
};

NavTabsLink.propTypes = propTypes;
NavTabsLink.defaultProps = defaultProps;

export default NavTabsLink;
