import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from '@/utils/day';
import { formatDate } from '@/utils/format';
import IconChevronLeft from '@/icons/ChevronLeft';
import IconChevronRight from '@/icons/ChevronRight';
import IconHistory from '@/icons/History';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Dropdown from './Dropdown';
import styles from './styles.module.scss';

const DATE_FORMAT = 'YYYY-MM-DD';
const isValidDate = (date) => dayjs(date).isValid();

// const quickFilterOptions = [
//   { text: 'вчера', unit: 'day', shift: 1 },
// ];

const propTypes = {
  min: PropTypes.string,
  max: PropTypes.string,
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
  className: PropTypes.string,
  onShift: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  min: '',
  max: '',
  dateStart: '',
  dateEnd: '',
  className: '',
};

const StatisticsDateInputs = function StatisticsDateInputs({
  min,
  max,
  dateStart,
  dateEnd,
  className,
  onShift,
  onChange,
  ...props
}) {
  const [shouldShowDropdown, setShouldShowDropdown] = useState(false);
  const canShiftToThePast = dayjs(dateStart).diff(dayjs(min)) > 0;
  const canShiftToTheFuture = dayjs(max).diff(dayjs(dateEnd)) > 0;

  const today = dayjs().format(DATE_FORMAT);

  const handleParamsChange = (e) => {
    const { name, value } = e?.target || {};
    if (!name) {
      return;
    }

    onChange({
      dateStart,
      dateEnd,
      [name]: formatDate(value, DATE_FORMAT),
    });
  };

  const handleShiftToThePast = () => {
    if (!canShiftToThePast) {
      return;
    }
    const minDate = dayjs(dateStart);
    const maxDate = dayjs(dateEnd);
    const shift = Math.max(1, maxDate.diff(minDate, 'day'));

    const newDateStart = dayjs(Math.max(
      minDate.subtract(shift, 'day').valueOf(),
      dayjs(min).valueOf(),
    )).format(DATE_FORMAT);

    const newDateEnd = dayjs(Math.min(
      maxDate.subtract(shift, 'day').valueOf(),
      dayjs(max).valueOf(),
    )).format(DATE_FORMAT);

    onShift({
      dateStart: newDateStart,
      dateEnd: newDateEnd,
    });
  };

  const handleShiftToTheFuture = () => {
    if (!canShiftToTheFuture) {
      return;
    }
    const minDate = dayjs(dateStart);
    const maxDate = dayjs(dateEnd);
    const todayDate = dayjs(today);
    const shift = Math.max(
      1,
      Math.min(
        maxDate.diff(minDate, 'day'),
        todayDate.diff(maxDate, 'day'),
      ),
    );
    onShift({
      dateStart: minDate.add(shift, 'day').format(DATE_FORMAT),
      dateEnd: maxDate.add(shift, 'day').format(DATE_FORMAT),
    });
  };

  const handleQuickOptionsClick = () => {
    setShouldShowDropdown(shouldShowDropdown);
  };

  return (
    <form
      className={cx([
        styles.form,
        className,
      ])}
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
          max={max}
          name="dateStart"
          type="date"
          value={(isValidDate(dateStart)
            ? formatDate(dateStart, DATE_FORMAT)
            : min || formatDate(dayjs(), DATE_FORMAT))}
          onChange={handleParamsChange}
        />
        &nbsp;
        -
        &nbsp;
        <Input
          min={min}
          max={max}
          name="dateEnd"
          type="date"
          value={(isValidDate(dateEnd)
            ? formatDate(dateEnd, DATE_FORMAT)
            : max || formatDate(dayjs(), DATE_FORMAT))}
          onChange={handleParamsChange}
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
      <div className={styles.quickOptions}>
        <Button
          className={styles.quickOptions_button}
          onClick={handleQuickOptionsClick}
        >
          <IconHistory />
        </Button>
        <Dropdown>
          1
        </Dropdown>
      </div>
    </form>
  );
};

StatisticsDateInputs.propTypes = propTypes;
StatisticsDateInputs.defaultProps = defaultProps;

export default StatisticsDateInputs;
