import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

const defaultProps = {

};

const MenuItem = function MenuItem(props) {
  const {
    to,
    icon,
  } = props;

  return (
    <Link
      className={['button-control', styles.menuItem]}
      to={to}
    >
      {icon}
    </Link>

  );
};

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;
