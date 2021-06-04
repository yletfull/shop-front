import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useOnClickOutside } from '@/hooks';
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
  const modalRef = useRef(null);

  const [isShowModal, setIsShowModal] = useState(isVisible);

  const closeModal = () => {
    setIsShowModal(false);
    onClose();
  };
  const handleClickCloseButton = () => closeModal();
  const handleClickOutside = () => closeModal();

  useEffect(() => {
    setIsShowModal(isVisible);
  }, [isVisible]);

  useOnClickOutside(modalRef, handleClickOutside);

  if (!isShowModal) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div
        ref={modalRef}
        className={styles.modal}
      >
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
    </div>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
