import React from 'react';
import PropTypes from 'prop-types';
import IconTimes from '@/icons/TimesLight';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  isVisible: PropTypes.bool,
  header: PropTypes.node,
  onClose: PropTypes.func,
};
const defaultProps = {
  children: null,
  isVisible: false,
  header: null,
  onClose: () => {},
};

const Modal = function Modal({
  children,
  isVisible,
  header,
  onClose,
}) {
  const handleClickCloseButton = () => onClose();

  return (
    <div className={styles.wrapper}>
      {isVisible && (
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            {header}
            <button
              type="button"
              className={styles.modalClose}
              onClick={handleClickCloseButton}
            >
              <IconTimes />
            </button>
          </div>
          <div className={styles.modalContent}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
