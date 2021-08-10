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
      {data.map((permission) => (
        <div
          key={permission.name || permission.id}
          className={styles.rolePermissionsRow}
        >
          {permission.title}
        </div>
      ))}
    </div>
  );
};

RolePermissions.propTypes = propTypes;
RolePermissions.defaultProps = defaultProps;

export default RolePermissions;
