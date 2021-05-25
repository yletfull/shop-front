/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
// import cx from 'classnames';
import TimesIcon from '@/icons/Times';
import Button from '@/components/Button';
import styles from './styles.module.scss';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string,
  ]).isRequired,
};

const defaultProps = {
  title: '',
};

const Modal = function Modal(props) {
  const { title, children, onClose } = props;

  const childrenArr = Array.isArray(children)
    ? children.map((el) => el)
    : [children];

  return (
    <div
      {...props}
      className={styles.modal}
    >
      <div className={styles.modalHeaderWrapper}>
        <h3 className={styles.modalHeaderTitle}>
          {title}
        </h3>

        <Button
          className={styles.modalCloseButton}
          onClick={onClose}
        >
          <TimesIcon />
        </Button>
      </div>

      <div className={styles.content}>
        {childrenArr.map((child) => child)}
      </div>
    </div>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
