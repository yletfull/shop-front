import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  from: PropTypes.string,
  to: PropTypes.string,
};

const defaultProps = {
  children: null,
  from: '',
  to: '',
};

const AttributePeriod = function AttributePeriod({
  children,
  from,
  to,
}) {
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

      {from && to && children}
    </div>
  );
};

AttributePeriod.propTypes = propTypes;
AttributePeriod.defaultProps = defaultProps;

export default AttributePeriod;
