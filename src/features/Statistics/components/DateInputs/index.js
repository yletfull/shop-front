import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useOnClickOutside } from '@/hooks';
import dayjs from '@/utils/day';
import IconChevronLeft from '@/icons/ChevronLeft';
import IconChevronRight from '@/icons/ChevronRight';
import IconHistory from '@/icons/History';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Dropdown from './Dropdown';
import styles from './styles.module.scss';
import { DATE_FORMAT, quickFilterOptions, shiftTypes } from './constants';
import { getShiftInterval, dateCheckRange } from './utils';

const propTypes = {
  min: PropTypes.string,
  max: PropTypes.string,
  values: PropTypes.shape({
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
  }),
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  min: '1800-01-01',
  max: '2100-12-31',
  values: {
    dateStart: '',
    dateEnd: '',
  },
  className: '',
};

const StatisticsDateInputs = function StatisticsDateInputs({
  min,
  max,
  values,
  className,
  onChange,
  ...props
}) {
  const [shouldShowDropdown, setShouldShowDropdown] = useState(false);
  const quickOptionsRef = useRef(null);
  useOnClickOutside(quickOptionsRef, () => setShouldShowDropdown(false));

  const localDateStart = values.dateStart || dayjs();
  const localDateEnd = values.dateEnd || dayjs();

  const canShiftToThePast = (
    dayjs(localDateStart) > dayjs(min)
  );

  const canShiftToTheFuture = (
    dayjs(localDateEnd) < dayjs(max)
  );

  const handleShift = (e) => {
    const { action, actionAvailable } = e.target.dataset;

    if (!actionAvailable) {
      return;
    }

    const dateStart = dayjs(localDateStart);
    const dateEnd = dayjs(localDateEnd);

    const interval = getShiftInterval({ dateStart, dateEnd, action });

    onChange(interval);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (!name || !value) {
      return;
    }

    if (values[name] !== value) {
      const interval = {
        ...values,
        [name]: value,
      };

      onChange(interval);
    }
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

    setShouldShowDropdown(false);
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
        data-action-available={canShiftToThePast}
        data-action={shiftTypes.subtract}
        onClick={handleShift}
      >
        <IconChevronLeft />
      </button>
      <div
        className={styles.inputs}
      >
        <Input
          min={dayjs(min).format(DATE_FORMAT)}
          max={dayjs(max).format(DATE_FORMAT)}
          className={dateCheckRange(localDateStart, min, max) ? styles.error : ''}
          value={localDateStart}
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
          className={dateCheckRange(localDateEnd, min, max) ? styles.error : ''}
          value={localDateEnd}
          name="dateEnd"
          type="date"
          onChange={handleChange}
        />
      </div>
      <button
        type="button"
        className={styles.arrow}
        disabled={!canShiftToTheFuture}
        data-action-available={canShiftToTheFuture}
        data-action={shiftTypes.add}
        onClick={handleShift}
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
