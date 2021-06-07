import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@/utils/format';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  datasets: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  selected: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  children: null,
  datasets: [],
  name: '',
  selected: [],
};

const AttributeDatasets = function AttributeDatasets({
  children,
  datasets,
  name,
  selected,
}) {
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
        appearance="control"
        onClick={handleClickShowModalButton}
      >
        {formatNumber(selected.length)}
        &nbsp;
        из
        &nbsp;
        {formatNumber(datasets.length)}
      </Button>

      <Modal
        isVisible={isShowModal}
        header={(
          <span>
            Датасеты
            {name ? ` с параметром «${name}»` : ''}
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
