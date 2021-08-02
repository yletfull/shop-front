import React from 'react';
import PropTypes from 'prop-types';
import IconCrop from '@/icons/Crop';
import IconPlus from '@/icons/Plus';
import Button from '@/components/Button';
import styles from './styles.module.scss';

const propTypes = {
  readOnly: PropTypes.bool,
  onAddClick: PropTypes.func,
};
const defaultProps = {
  readOnly: false,
  onAddClick: () => {},
};

const EmptyState = function SegmentEditorEmptyState({
  readOnly,
  onAddClick,
}) {
  const handleAddClick = () => {
    if (readOnly) {
      return;
    }

    onAddClick();
  };

  return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>
        <IconCrop />
      </div>
      <div className={styles.emptyBody}>
        Не выбрано ни одного условия
      </div>
      {!readOnly && (
        <Button
          className={styles.addButton}
          onClick={handleAddClick}
        >
          <IconPlus className={styles.addButtonIcon} />
          добавить параметры
        </Button>
      )}
    </div>
  );
};

EmptyState.propTypes = propTypes;
EmptyState.defaultProps = defaultProps;

export default EmptyState;
