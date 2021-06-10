import React, { Children, cloneElement, useState } from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@/utils/format';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  datasets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    name: PropTypes.string,
  })),
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
      {(Array.isArray(datasets) && datasets.length)
        ? (
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
        )
        : (
          <span className={styles.attributeDatasetsEmptyText}>
            Нет доступных датасетов
          </span>
        )}

      <Modal
        isVisible={isShowModal}
        header={(
          <span className={styles.attributeDatasetsHeader}>
            Датасеты
            {name ? ` с параметром «${name}»` : ''}
          </span>
        )}
        onClose={handleCloseModal}
      >
        {Children.map(children, (child) => cloneElement(child, {
          onClose: handleCloseModal,
        }))}
      </Modal>
    </div>
  );
};

AttributeDatasets.propTypes = propTypes;
AttributeDatasets.defaultProps = defaultProps;

export default AttributeDatasets;
