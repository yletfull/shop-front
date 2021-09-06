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
import { DATE_FORMAT, quickFilterOptions } from './constants';
import { getFutureShiftInterval, getPastShiftInterval } from './utils';

const isValidDate = (date) => dayjs(date).isValid();

const propTypes = {
  min: PropTypes.string,
  max: PropTypes.string,
  values: PropTypes.shape({
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
  }),
  className: PropTypes.string,
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

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const dateEnd = isValidDate(values.dateEnd)
      ? formatDate(values.dateEnd, DATE_FORMAT)
      : formatDate(dayjs(), DATE_FORMAT);
    const dateStart = isValidDate(values.dateStart)
      ? formatDate(values.dateStart, DATE_FORMAT)
      : formatDate(dayjs(), DATE_FORMAT);

    setLocalState({ dateStart, dateEnd });
  }, [values]);

  const quickOptionsRef = useRef(null);
  useOnClickOutside(quickOptionsRef, hideDropdown);

  const canShiftToThePast = (
    (dayjs(values.dateStart).diff(dayjs(min)) > 0) && !isFetching
  );

  const handleShiftToThePast = () => {
    if (!canShiftToThePast) {
      return;
    }

    const dateStart = dayjs(values.dateStart);
    const dateEnd = dayjs(values.dateEnd);

    const interval = getPastShiftInterval({ dateStart, dateEnd });

    onChange(interval);
  };

  const canShiftToTheFuture = (
    (dayjs(max).diff(dayjs(values.dateEnd)) > 0) && !isFetching
  );

  const handleShiftToTheFuture = () => {
    if (!canShiftToTheFuture) {
      return;
    }

    const dateStart = dayjs(values.dateStart);
    const dateEnd = dayjs(values.dateEnd);

    const interval = getFutureShiftInterval({ dateStart, dateEnd, min, max });

    onChange(interval);
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
      setIsFetching(true);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await onChange(localState);
      setIsFetching(false);
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
          data-active={shouldShowDropdown}
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
