import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconPlus from '@/icons/Plus';
import IconSearch from '@/icons/Search';
import styles from './styles.module.scss';

const types = {
  create: 'create',
  search: 'search',
};

const propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(types)),
};

const defaultProps = {
  children: null,
  type: '',
};

const ControlsLink = function ControlsLink({ children, to, type, ...props }) {
  const Icon = {
    [types.create]: IconPlus,
    [types.search]: IconSearch,
  }[type] || null;

  return (
    <Link
      className={styles.controlsLink}
      to={to}
      {...props}
    >
      <span className={styles.controlsLinkIcon}>
        {Icon && (
          <Icon />
        )}
      </span>
      {children}
    </Link>
  );
};

ControlsLink.propTypes = propTypes;
ControlsLink.defaultProps = defaultProps;

export default ControlsLink;
