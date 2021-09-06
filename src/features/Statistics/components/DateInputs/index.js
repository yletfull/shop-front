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
import { timeUnits } from './constants';

const { day, week, month, year } = timeUnits;

const DATE_FORMAT = 'YYYY-MM-DD';
const isValidDate = (date) => dayjs(date).isValid();

const quickFilterOptions = [
  { text: 'вчера', unit: day, shift: 1 },
  { text: 'предыдущая неделя', unit: week, shift: 1 },
];

const propTypes = {
  min: PropTypes.string,
  max: PropTypes.string,
  values: PropTypes.shape({
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
  }),
  className: PropTypes.string,
  onShift: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  debounceDelay: PropTypes.number,
};

const defaultProps = {
  min: '',
  max: '',
  values: {
    dateStart: '',
    dateEnd: '',
  },
  className: '',
  debounceDelay: 900,
};

const StatisticsDateInputs = function StatisticsDateInputs({
  min,
  max,
  values,
  className,
  onShift,
  onChange,
  debounceDelay,
  ...props
}) {
  const [shouldShowDropdown, setShouldShowDropdown] = useState(false);

  const hideDropdown = () => setShouldShowDropdown(false);

  const [localState, setLocalState] = useState({
    dateStart: dayjs(),
    dateEnd: dayjs(),
  });

  useEffect(() => {
    const dateEnd = isValidDate(values.dateEnd)
      ? formatDate(values.dateEnd, DATE_FORMAT)
      : formatDate(dayjs(max), DATE_FORMAT);
    const dateStart = isValidDate(values.dateStart)
      ? formatDate(values.dateStart, DATE_FORMAT)
      : formatDate(dayjs(min), DATE_FORMAT);

    setLocalState({
      dateStart, dateEnd,
    });
  }, [values, min, max]);

  const quickOptionsRef = useRef(null);
  useOnClickOutside(quickOptionsRef, hideDropdown);

  const today = dayjs().format(DATE_FORMAT);

  const canShiftToThePast = dayjs(values.dateStart).diff(dayjs(min)) > 0;
  const canShiftToTheFuture = dayjs(max).diff(dayjs(values.dateEnd)) > 0;

  const handleShiftToThePast = () => {
    if (!canShiftToThePast) {
      return;
    }

    const dateStart = dayjs(values.dateStart);
    const dateEnd = dayjs(values.dateEnd);

    let selectedUnits = day;

    if ((dateStart.month() === 0 && dateStart.date() === 1)
      && (dateEnd.month() === 11 && dateEnd.date() === 31)) {
      selectedUnits = year;
    } else if ((
      dateStart.date() === 1) && dateEnd.date() === dateEnd.daysInMonth()
    ) {
      selectedUnits = month;
    } else if (dateStart.day() === 1 && dateEnd.day() === 0) {
      selectedUnits = week;
    }

    const shift = Math.max(1, dateEnd.diff(dateStart, selectedUnits));

    const newDateStart = dayjs(Math.max(
      dateStart.subtract(shift, selectedUnits).valueOf(),
      dayjs(min).valueOf(),
    )).format(DATE_FORMAT);

    const newDateEnd = dayjs(Math.min(
      dateEnd.subtract(shift, selectedUnits).valueOf(),
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

    let selectedUnits = day;

    if ((dateStart.month() === 0 && dateStart.date() === 1)
      && (dateEnd.month() === 11 && dateEnd.date() === 31)) {
      selectedUnits = year;
    } else if (
      (dateStart.date() === 1) && dateEnd.date() === dateEnd.daysInMonth()
    ) {
      selectedUnits = month;
    } else if (dateStart.day() === 1 && dateEnd.day() === 0) {
      selectedUnits = week;
    }

    const shift = Math.max(
      1,
      Math.min(
        dateEnd.diff(dateStart, selectedUnits),
        todayDate.diff(dateEnd, selectedUnits),
      ),
    );

    onShift({
      dateStart: dateStart.add(shift, selectedUnits).format(DATE_FORMAT),
      dateEnd: dateEnd.add(shift, selectedUnits).format(DATE_FORMAT),
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

    onChange({
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

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (localState[name] !== value) {
      setLocalState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(localState);
    }, debounceDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [localState, debounceDelay, onChange]);

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
          min={dayjs(min).format(DATE_FORMAT)}
          max={dayjs(max).format(DATE_FORMAT)}
          value={localState.dateStart}
          name="dateStart"
          type="date"
          onChange={handleChange}
        />
        &nbsp;
        -
        &nbsp;
        <Input
          min={dayjs(min).format(DATE_FORMAT)}
          max={dayjs(max).format(DATE_FORMAT)}
          value={localState.dateEnd}
          name="dateEnd"
          type="date"
          onChange={handleChange}
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
