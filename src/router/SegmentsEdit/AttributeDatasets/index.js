import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  children: null,
  data: [],
};

const AttributeDatasets = function AttributeDatasets({ children, data }) {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleClickShowModalButton = () => {
    setIsShowModal(true);
  };
  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <div className={styles.attributeDatasets}>
      <Button
        onClick={handleClickShowModalButton}
      >
        Выбрано выгрузок:
        &nbsp;
        {data.length}
      </Button>

      <Modal
        isVisible={isShowModal}
        header={(
          <span>
            Выгрузки
          </span>
        )}
        onClose={handleCloseModal}
      >
        {children}
      </Modal>
    </div>
  );
};

AttributeDatasets.propTypes = propTypes;
AttributeDatasets.defaultProps = defaultProps;

export default AttributeDatasets;
