import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import styles from './styles.module.scss';

const propTypes = {
  isSaving: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
const defaultProps = {
  isSaving: false,
};

const ConfirmModal = function SegmentsSaveFormConfirmModal({
  isSaving,
  onConfirm,
  onCancel,
}) {
  const handleConfirm = () => {
    if (!isSaving) {
      onConfirm();
    }
  };
  const handleCancel = () => {
    if (!isSaving) {
      onCancel();
    }
  };

  return (
    <Modal
      title="Сохранение сегмента"
      preventClose={isSaving}
      onClose={handleCancel}
    >
      <div className={styles.confirm}>
        {isSaving && (
          <Spinner
            layout="overlay"
            className={styles.confirmSpinner}
          />
        )}

        <div className={styles.confirmText}>
          Вы уверены, что хотите сохранить сегмент?
          <br />
          Редактировать сегмент после сохранения невозможно.
        </div>
        <div className={styles.confirmActions}>
          <Button
            appearance="secondary"
            className={styles.confirmButton}
            onClick={handleCancel}
          >
            отмена
          </Button>
          <Button
            className={styles.confirmButton}
            onClick={handleConfirm}
          >
            сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ConfirmModal.propTypes = propTypes;
ConfirmModal.defaultProps = defaultProps;

export default ConfirmModal;
