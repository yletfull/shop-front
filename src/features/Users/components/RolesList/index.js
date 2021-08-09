import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import IconTimes from '@/icons/Times';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
  })),
  isEditable: PropTypes.bool,
};

const defaultProps = {
  data: [],
  isEditable: false,
};

const RolesList = function RolesList({
  data,
  isEditable,
}) {
  return (
    <div className={styles.rolesList}>
      {data.map((role) => (
        <div
          key={role.id}
          className={styles.rolesListRow}
        >
          <span
            title={role.title}
            className={styles.rolesListTitle}
          >
            {role.title}
          </span>

          {isEditable && (
            <Button
              appearance="secondary"
              className={styles.rolesListButton}
            >
              <IconTimes />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

RolesList.propTypes = propTypes;
RolesList.defaultProps = defaultProps;

export default RolesList;
