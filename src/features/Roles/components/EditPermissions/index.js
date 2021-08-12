import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import IconTimes from '@/icons/TimesLight';
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
  onRemove: PropTypes.func,
};

const defaultProps = {
  data: [],
  onRemove: () => {},
};

const EditPermissions = function EditPermissions({
  data,
  onRemove,
}) {
  const handleClickRemoveButton = (e) => {
    const { value } = e?.target || {};
    onRemove(value);
  };
  return (
    <div className={styles.editPermissions}>
      {data.length === 0 && (
        <div className={styles.editPermissionsEmpty}>
          Нет разрешений
        </div>
      )}
      <div className={styles.editPermissionsList}>
        {data.map((d, index) => (
          <div
            key={d.name || d.id}
            className={styles.editPermissionsRow}
          >
            <span className={styles.editPermissionsLabel}>
              {`${index + 1}. `}
              {d.title}
            </span>
            <Button
              appearance="control"
              className={styles.editPermissionsRemove}
              value={d.name}
              onClick={handleClickRemoveButton}
            >
              <IconTimes />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

EditPermissions.propTypes = propTypes;
EditPermissions.defaultProps = defaultProps;

export default EditPermissions;
