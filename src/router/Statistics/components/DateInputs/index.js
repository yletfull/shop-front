import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  dateStart: '',
  dateEnd: '',
  className: '',
  onSubmit: null,
};

const StatisticsErrorMessage = function StatisticsErrorMessage({
  dateStart,
  dateEnd,
  className,
  onSubmit,
  ...props
}) {
  const [params, setParams] = useState({
    dateStart,
    dateEnd,
  });

  const handleParamsChange = (key) => (e) => {
    setParams({
      ...params,
      [key]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(params);
  };

  return (
    <form
      className={cx([
        styles.inputs,
        className,
      ])}
      onSubmit={handleFormSubmit}
      {...props}
    >
      <label
        className={styles.wrapper}
      >
        с
        {' '}
        <Input
          name="dateStart"
          type="date"
          value={params.dateStart}
          onChange={handleParamsChange('dateStart')}
        />
      </label>
      <label
        className={styles.wrapper}
      >
        по
        {' '}
        <Input
          name="dateEnd"
          type="date"
          value={params.dateEnd}
          onChange={handleParamsChange('dateEnd')}
        />
      </label>
      <Button
        type="submit"
      >
        Поиск
      </Button>
    </form>
  );
};

StatisticsErrorMessage.propTypes = propTypes;
StatisticsErrorMessage.defaultProps = defaultProps;

export default StatisticsErrorMessage;
