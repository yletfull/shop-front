
import React from 'react';

import PropTypes from 'prop-types';
import Popup from '@/components/Popup';
import styles from './styles.module.scss';

const propTypes = {
  onClose: PropTypes.func,
  error: PropTypes.string.isRequired,
};

const defaultProps = {
  onClose: () => {},
};

const ErrorListPopup = function ErrorListPopupScreen({ onClose, error }) {
  return (
    <Popup
      onClose={onClose}
      title="Ошибки"
      style={{ backgroundColor: 'rgb(188 188 188)' }}
    >
      <div className={styles.textField}>
        {error}
      </div>
    </Popup>
  );
};

ErrorListPopup.propTypes = propTypes;
ErrorListPopup.defaultProps = defaultProps;

export default ErrorListPopup;
