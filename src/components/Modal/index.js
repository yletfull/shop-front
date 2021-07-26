import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { rootNodes } from '@/constants/dom';
import useKeyPress from '@/hooks/use-key-press';
import useScrollDisable from '@/hooks/use-scroll-disable';
import useFocusCapture from '@/hooks/use-focus-capture';
import IconTimesLight from '@/icons/TimesLight';
import Portal from '@/components/Portal';
import styles from './styles.module.scss';

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  width: PropTypes.number,
  preventClose: PropTypes.bool,
  preventScrollDisable: PropTypes.bool,
  preventCloseByEsc: PropTypes.bool,
  preventFocusCapture: PropTypes.bool,
  onClose: PropTypes.func,
};
const defaultProps = {
  className: '',
  title: null,
  size: 'medium',
  width: 0,
  preventClose: false,
  preventScrollDisable: false,
  preventCloseByEsc: false,
  preventFocusCapture: false,
  onClose: () => {},
};

const Modal = function Modal({
  className,
  title,
  children,
  size,
  width,
  preventClose,
  preventScrollDisable,
  preventCloseByEsc,
  preventFocusCapture,
  onClose,
}) {
  const handleClose = onClose;
  const isClosable = !preventClose && typeof handleClose === 'function';
  const shouldRenderHeader = Boolean(title) || isClosable;
  const ref = useRef();

  useKeyPress({
    event: (!preventCloseByEsc && isClosable) && 'keydown',
    key: 'Escape',
    handler: handleClose,
  });

  useScrollDisable(preventScrollDisable);
  useFocusCapture({ preventFocusCapture, ref });

  return (
    <Portal target={rootNodes.portalModals}>
      <div
        ref={ref}
        className={cx(styles.wrapper, className)}
      >
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
