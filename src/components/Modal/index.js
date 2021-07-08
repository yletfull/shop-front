import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import IconTimesLight from '@/icons/TimesLight';
import styles from './styles.module.scss';

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};
const defaultProps = {
  className: '',
  title: null,
  onClose: () => {},
};

const Modal = function Modal({
  className,
  title,
  children,
  onClose,
}) {
  const handleClose = onClose;

  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          <span className={styles.modalHeaderTitle}>
            {title}
          </span>

          <button
            type="button"
            className={styles.modalCloseButton}
            onClick={handleClose}
          >
            <IconTimesLight className={styles.modalCloseIcon} />
          </button>
        </header>

        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
