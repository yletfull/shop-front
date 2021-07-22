import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from '@/utils/day';
import IconChevronLeft from '@/icons/ChevronLeft';
import IconChevronRight from '@/icons/ChevronRight';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './styles.module.scss';

const DATE_FORMAT = 'YYYY-MM-DD';

const propTypes = {
  min: PropTypes.string,
  max: PropTypes.string,
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  min: '',
  max: '',
  dateStart: '',
  dateEnd: '',
  className: '',
  onSubmit: null,
};

const StatisticsDateInputs = function StatisticsDateInputs({
  min,
  max,
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

  const canShiftToThePast = dayjs(params.dateStart).diff(dayjs(min)) > 0;
  const canShiftToTheFuture = dayjs(max).diff(dayjs(params.dateEnd)) > 0;

  const updateParams = (newValue) => {
    setParams({
      ...params,
      ...newValue,
    });
  };

  const today = dayjs().format(DATE_FORMAT);

  const handleParamsChange = (key) => (e) => {
    updateParams({ [key]: e.target.value });
  };

  const handleShiftToThePast = () => {
    if (!canShiftToThePast) {
      return;
    }
    const minDate = dayjs(params.dateStart);
    const maxDate = dayjs(params.dateEnd);
    const shift = Math.max(1, maxDate.diff(minDate, 'day'));

    const newDateStart = dayjs(Math.max(
      minDate.subtract(shift, 'day').valueOf(),
      dayjs(min).valueOf(),
    )).format(DATE_FORMAT);

    const newDateEnd = dayjs(Math.min(
      maxDate.subtract(shift, 'day').valueOf(),
      dayjs(max).valueOf(),
    )).format(DATE_FORMAT);

    updateParams({
      dateStart: newDateStart,
      dateEnd: newDateEnd,
    });
  };

  const handleShiftToTheFuture = () => {
    if (!canShiftToTheFuture) {
      return;
    }
    const minDate = dayjs(params.dateStart);
    const maxDate = dayjs(params.dateEnd);
    const todayDate = dayjs(today);
    const shift = Math.max(
      1,
      Math.min(
        maxDate.diff(minDate, 'day'),
        todayDate.diff(maxDate, 'day'),
      ),
    );
    updateParams({
      dateStart: minDate.add(shift, 'day').format(DATE_FORMAT),
      dateEnd: maxDate.add(shift, 'day').format(DATE_FORMAT),
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(params);
  };

  return (
    <form
      className={cx([
        styles.form,
        className,
      ])}
      onSubmit={handleFormSubmit}
      {...props}
    >
      <button
        type="button"
        className={styles.arrow}
        disabled={!canShiftToThePast}
        onClick={handleShiftToThePast}
      >
        <IconChevronLeft />
      </button>
      <div
        className={styles.inputs}
      >
        <Input
          min={min}
          max={params.dateEnd}
          name="dateStart"
          type="date"
          value={params.dateStart}
          onChange={handleParamsChange('dateStart')}
        />
        &nbsp;
        -
        &nbsp;
        <Input
          min={params.dateStart}
          max={max}
          name="dateEnd"
          type="date"
          value={params.dateEnd}
          onChange={handleParamsChange('dateEnd')}
        />
      </div>
      <button
        type="button"
        className={styles.arrow}
        disabled={!canShiftToTheFuture}
        onClick={handleShiftToTheFuture}
      >
        <IconChevronRight />
      </button>
      <Button
        type="submit"
        className={styles.submit}
      >
        Поиск
      </Button>
    </form>
  );
};

StatisticsDateInputs.propTypes = propTypes;
StatisticsDateInputs.defaultProps = defaultProps;

export default StatisticsDateInputs;
