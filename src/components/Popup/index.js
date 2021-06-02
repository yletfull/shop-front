/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import TimesIcon from '@/icons/Times';
import Button from '@/components/Button';
import styles from './styles.module.scss';

const propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  title: '',
};

const Popup = function Popup(props) {
  const { title, children, onClose } = props;

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
        {children}
      </div>
    </div>
  );
};

Popup.propTypes = propTypes;
Popup.defaultProps = defaultProps;

export default Popup;
