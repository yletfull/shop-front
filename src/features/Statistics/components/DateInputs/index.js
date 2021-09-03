import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useOnClickOutside } from '@/hooks';
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

const quickFilterOptions = [
  { text: 'вчера', unit: 'day', shift: 1 },
  { text: 'предыдущая неделя', unit: 'week', shift: 1 },
];

const propTypes = {
  min: PropTypes.string,
  values: PropTypes.shape({
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
  }),
  className: PropTypes.string,
  onShift: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const defaultProps = {
  min: '',
  values: {
    dateStart: '',
    dateEnd: '',
  },
  className: '',
};

const StatisticsDateInputs = function StatisticsDateInputs({
  min,
  values,
  className,
  onShift,
  onChange,
  onSelect,
  ...props
}) {
  const [shouldShowDropdown, setShouldShowDropdown] = useState(false);

  const hideDropdown = () => setShouldShowDropdown(false);

  const dateStartRef = useRef();
  const dateEndRef = useRef();

  useEffect(() => {
    dateEndRef.current.value = isValidDate(values.dateEnd)
      ? formatDate(values.dateEnd, DATE_FORMAT)
      : formatDate(dayjs(min), DATE_FORMAT);
    dateStartRef.current.value = isValidDate(values.dateStart)
      ? formatDate(values.dateStart, DATE_FORMAT)
      : formatDate(dayjs(min), DATE_FORMAT);
  }, [min, values]);

  const quickOptionsRef = useRef(null);
  useOnClickOutside(quickOptionsRef, hideDropdown);

  const today = dayjs().format(DATE_FORMAT);
  const max = today;

  const canShiftToThePast = dayjs(values.dateStart).diff(dayjs(min)) > 0;
  const canShiftToTheFuture = dayjs(max).diff(dayjs(values.dateEnd)) > 0;

  const handleParamsChange = (
    e,
  ) => {
    const { name, value } = e?.target || {};

    const update = () => onChange({
      ...values,
      [name]: formatDate(value, DATE_FORMAT),
    });

    if (!name || !value) {
      return;
    }

    update();
  };

  const handleShiftToThePast = () => {
    if (!canShiftToThePast) {
      return;
    }
    const dateStart = dayjs(values.dateStart);
    const dateEnd = dayjs(values.dateEnd);
    const shift = Math.max(1, dateEnd.diff(dateStart, 'day'));

    const newDateStart = dayjs(Math.max(
      dateStart.subtract(shift, 'day').valueOf(),
      dayjs(min).valueOf(),
    )).format(DATE_FORMAT);

    const newDateEnd = dayjs(Math.min(
      dateEnd.subtract(shift, 'day').valueOf(),
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
    const dateStart = dayjs(values.dateStart);
    const dateEnd = dayjs(values.dateEnd);
    const todayDate = dayjs(today);
    const shift = Math.max(
      1,
      Math.min(
        dateEnd.diff(dateStart, 'day'),
        todayDate.diff(dateEnd, 'day'),
      ),
    );
    onShift({
      dateStart: dateStart.add(shift, 'day').format(DATE_FORMAT),
      dateEnd: dateEnd.add(shift, 'day').format(DATE_FORMAT),
    });
  };

  const handleQuickOptionsClick = () => {
    setShouldShowDropdown(!shouldShowDropdown);
  };

  const handleQuickSelect = (e) => {
    e.preventDefault();

    const { unit, shift } = e.target.dataset;

    if (!unit || !shift) {
      return;
    }

    onSelect({
      dateStart: dayjs()
        .startOf(unit)
        .subtract(shift, unit)
        .format(DATE_FORMAT),
      dateEnd: dayjs()
        .endOf(unit)
        .subtract(shift, unit)
        .format(DATE_FORMAT),
    });
    hideDropdown();
  };

  const [lastDatesInputValues, setLastDatesInputValues] = useState({
    dateStart: '',
    dateEnd: '',
  });

  const handleDateInputBlur = (e) => {
    const { value, name } = e.target;

    if (lastDatesInputValues[name] !== value) {
      handleParamsChange(e, true, true);

      setLastDatesInputValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
          ref={dateStartRef}
          onBlur={handleDateInputBlur}
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
          ref={dateEndRef}
          onBlur={handleDateInputBlur}
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
      <div
        ref={quickOptionsRef}
        className={styles.quickOptions}
      >
        <Button
          className={styles.quickOptions_button}
          onClick={handleQuickOptionsClick}
        >
          <IconHistory />
        </Button>
        {shouldShowDropdown && (
          <Dropdown
            className={styles.quickOptions_dropdown}
            onClick={handleQuickSelect}
          >
            {quickFilterOptions.map(({ text, unit, shift }) => (
              <button
                key={`${unit}-${shift}`}
                type="button"
                className={cx([styles.quickOptions_item, 'link'])}
                data-shift={shift}
                data-unit={unit}
              >
                {text}
              </button>
            ))}
          </Dropdown>
        )}
      </div>
    </form>
  );
};

StatisticsDateInputs.propTypes = propTypes;
StatisticsDateInputs.defaultProps = defaultProps;

export default StatisticsDateInputs;
