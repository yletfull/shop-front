import React from 'react';
import PropTypes from 'prop-types';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
};

const defaultProps = {
  from: '',
  to: '',
};

const AttributePeriod = function AttributePeriod({ from, to }) {
  const handleChangePeriodSelect = (e) => {
    const { value } = e?.target || {};
    if (!value) {
      return;
    }
    console.log(value);
  };

  return (
    <div className={styles.attributePeriod}>
      <select
        name="select"
        defaultValue="0"
        onChange={handleChangePeriodSelect}
      >
        <option value="0">
          За все время
        </option>
        <option value="1">
          Период
        </option>
      </select>

      {from && to && (
        <div className={styles.attributePeriodRange}>
          <Input
            type="text"
            value={from}
            placeholder="From"
            disabled
          />
          &nbsp;
          <Input
            type="text"
            value={to}
            placeholder="To"
            disabled
          />
        </div>
      )}
    </div>
  );
};

AttributePeriod.propTypes = propTypes;
AttributePeriod.defaultProps = defaultProps;

export default AttributePeriod;
