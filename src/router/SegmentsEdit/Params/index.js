import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@/components/Modal';
import Spinner from '@/components/Spinner';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.objectOf(PropTypes.sting),
  isFetching: PropTypes.bool,
  isVisible: PropTypes.bool,
  onCloseModal: PropTypes.func,
};
const defaultProps = {
  children: null,
  data: {},
  isFetching: false,
  isVisible: false,
  onCloseModal: () => {},
};

const Params = function Params({
  children,
  data,
  isFetching,
  isVisible,
  onCloseModal,
}) {
  const handleCloseModal = () => onCloseModal();

  return (
    <div className={styles.params}>
      {children}
      <Modal
        isVisible={isVisible}
        header={(
          <span>
            Header
          </span>
        )}
        onClose={handleCloseModal}
      >
        {isFetching && (
          <Spinner />
        )}
        {JSON.stringify(data)}
      </Modal>
    </div>
  );
};

Params.propTypes = propTypes;
Params.defaultProps = defaultProps;

export default Params;
