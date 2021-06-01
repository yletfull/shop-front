import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Spinner from '@/components/Spinner';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  isFetching: PropTypes.bool,
};
const defaultProps = {
  children: null,
  isFetching: false,
};

const Params = function Params({
  children,
  isFetching,
}) {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleClickShowModal = () => {
    if (isShowModal) {
      return;
    }
    setIsShowModal(true);
  };
  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <div className={styles.params}>
      <Button
        type="button"
        onClick={handleClickShowModal}
      >
        + ещё параметр
      </Button>

      <Modal
        isVisible={isShowModal}
        header={(
          <span>
            Выбрать значения
          </span>
        )}
        onClose={handleCloseModal}
      >
        {isFetching && (
          <Spinner />
        )}
        {!isFetching && children}
      </Modal>
    </div>
  );
};

Params.propTypes = propTypes;
Params.defaultProps = defaultProps;

export default Params;
