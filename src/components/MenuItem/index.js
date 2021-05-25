import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string,
};

const defaultProps = {
  title: '',
};

const MenuItem = function MenuItem(props) {
  const {
    to,
    icon,
    title,
  } = props;

  return (
    <NavLink
      className={styles.menuItem}
      to={to}
      title={title}
      activeClassName="active-link-class"
    >
      {icon}
    </NavLink>

  );
};

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;
