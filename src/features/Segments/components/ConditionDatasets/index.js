import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@/components/Modal';
import { serializeValues } from '@/features/Segments/utils';
import Form from './Form';
import styles from './styles.module.scss';

const propTypes = {
  readOnly: PropTypes.bool,
  attributeName: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      loadedAt: PropTypes.string,
      entityTypeTotals: PropTypes.arrayOf(
        PropTypes.shape({
          entityType: PropTypes.oneOf(['PHONE', 'EMAIL']),
          total: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};
const defaultProps = {
  readOnly: false,
};

const ConditionDatasets = function SegmentConditionDatasetsSelect({
  readOnly,
  attributeName,
  value,
  options,
  onChange,
}) {
  const [isModalShown, setIsModalShown] = useState(false);
  const handleModalOpen = () => setIsModalShown(true);
  const handleModalClose = () => {
    setIsModalShown(false);
  };

  const isAny = !Array.isArray(value) || !value.length;

  const handleFormSubmit = (nextValue) => {
    if (!readOnly && serializeValues(nextValue) !== serializeValues(value)) {
      onChange(nextValue);
    }

    setIsModalShown(false);
  };

  return (
    <Fragment>
      <span className={styles.wrapper}>
        <button
          type="button"
          className={styles.button}
          onClick={handleModalOpen}
        >
          {isAny
            ? 'любой'
            : `${value.length} из ${options.length}`}
        </button>
      </span>
      {isModalShown && (
        <Modal
          title={`Датасеты параметра «${attributeName}»`}
          onClose={handleModalClose}
        >
          <Form
            readOnly={readOnly}
            value={value}
            options={options}
            onReset={handleModalClose}
            onSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </Fragment>
  );
};

ConditionDatasets.propTypes = propTypes;
ConditionDatasets.defaultProps = defaultProps;

export default ConditionDatasets;
