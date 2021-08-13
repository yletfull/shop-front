import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    name: PropTypes.string,
    title: PropTypes.string,
  })),
};

const defaultProps = {
  data: [],
};

const RolePermissions = function RolePermissions({
  data,
}) {
  return (
    <div className={styles.rolePermissions}>
      {data.map((d, index) => (
        <span
          key={d.name || d.id}
          className={styles.rolePermissionsRow}
        >
          {`${index + 1}. `}
          {d.title || '-'}
        </span>
      ))}
    </div>
  );
};

RolePermissions.propTypes = propTypes;
RolePermissions.defaultProps = defaultProps;

export default RolePermissions;
