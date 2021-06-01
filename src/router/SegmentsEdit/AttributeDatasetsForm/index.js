import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import Button from '@/components/Button';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  dateRange: PropTypes.node,
  selected: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  data: [],
  dateRange: null,
  selected: [],
};

const AttributeDatasetsForm = function AttributeDatasetsForm({
  data,
  dateRange,
  selected,
}) {
  const handleClickSelectAllButton = () => {};
  const handleSubmitForm = () => {};

  return (
    <div className={styles.attributeDatasetsForm}>
      {dateRange}
      <Form onSubmit={handleSubmitForm}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.attributeDatasetsFormSection}>
              <span>
                Выбрано
                &nbsp;
                {selected.length}
              </span>

              <Button
                onClick={handleClickSelectAllButton}
                disabled
              >
                Выбрать все
              </Button>
            </div>

            {data.map((d) => (
              <label
                key={d}
                className={styles.attributeDatasetsFormLabel}
              >
                <Field
                  name="datasets"
                  component="input"
                  type="checkbox"
                  value={d}
                  checked
                />
                {d}
              </label>
            ))}
          </form>
        )}
      </Form>
    </div>
  );
};

AttributeDatasetsForm.propTypes = propTypes;
AttributeDatasetsForm.defaultProps = defaultProps;

export default AttributeDatasetsForm;
