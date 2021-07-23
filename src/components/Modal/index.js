import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useKeyPress } from '@/hooks';
import IconTimesLight from '@/icons/TimesLight';
import Portal from '../Portal';
import styles from './styles.module.scss';

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.number,
  notСlosable: PropTypes.bool,
  onClose: PropTypes.func,
};
const defaultProps = {
  className: '',
  title: null,
  size: 'medium',
  width: 0,
  notСlosable: false,
  onClose: () => {},
};

const Modal = function Modal({
  className,
  title,
  children,
  size,
  width,
  notСlosable,
  onClose,
}) {
  const handleClose = onClose;
  const isClosable = !notСlosable && typeof handleClose === 'function';
  const shouldRenderHeader = Boolean(title) && isClosable;

  useKeyPress({
    event: isClosable && 'keydown',
    key: 'Escape',
    handler: handleClose,
  });

  return (
    <Portal>
      <div className={cx(styles.wrapper, className)}>
        {isClosable && (
          <div
            role="presentation"
            className={styles.overlay}
            onClick={handleClose}
          />
        )}

        <div
          className={cx(
            styles.modal,
            styles[`modal_size-${size}`],
          )}
          style={{
            width: width ? `${width}rem` : null,
          }}
        >
          {shouldRenderHeader && (
            <header className={styles.modalHeader}>
              <span className={styles.modalHeaderTitle}>
                {title}
              </span>

              {isClosable && (
                <button
                  type="button"
                  className={styles.modalCloseButton}
                  onClick={handleClose}
                >
                  <IconTimesLight className={styles.modalCloseIcon} />
                </button>
              )}
            </header>
          )}

          <div className={styles.modalBody}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
