import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@/components/Modal';
import Spinner from '@/components/Spinner';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  form: PropTypes.node,
  isFetching: PropTypes.bool,
  isVisible: PropTypes.bool,
  onCloseForm: PropTypes.func,
};
const defaultProps = {
  children: null,
  form: null,
  isFetching: false,
  isVisible: false,
  onCloseForm: () => {},
};

const Params = function Params({
  children,
  form,
  isFetching,
  isVisible,
  onCloseForm,
}) {
  const handleCloseModal = () => {
    onCloseForm();
  };

  return (
    <div className={styles.params}>
      {children}
      {isVisible && (
        <Modal
          title={(
            <span>
              Выбрать значения
            </span>
          )}
          onClose={handleCloseModal}
        >
          {isFetching && (
            <Spinner />
          )}
          {!isFetching && form}
        </Modal>
      )}
    </div>
  );
};

Params.propTypes = propTypes;
Params.defaultProps = defaultProps;

export default Params;
