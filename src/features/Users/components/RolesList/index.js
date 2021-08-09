import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import IconTimes from '@/icons/TimesLight';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    title: PropTypes.string,
  })),
  isEditable: PropTypes.bool,
  onRemove: PropTypes.func,
};

const defaultProps = {
  data: [],
  isEditable: false,
  onRemove: () => {},
};

const RolesList = function RolesList({
  data,
  isEditable,
  onRemove,
}) {
  const handleClickRemoveButton = (e) => {
    const { value } = e?.target || {};
    if (!value) {
      return;
    }
    onRemove(value);
  };

  return (
    <div className={styles.rolesList}>
      {data.map((role, index) => (
        <div
          key={role.id}
          className={styles.rolesListRow}
        >
          <span
            title={role.title}
            className={styles.rolesListTitle}
          >
            {`${index + 1}. ${role.title}`}
          </span>

          {isEditable && (
            <Button
              appearance="control"
              className={styles.rolesListButton}
              title={`Удалить "${role.title}"`}
              value={role.id}
              onClick={handleClickRemoveButton}
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
