import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import dayjs from '@/utils/day';
import { formatDate } from '@/utils/format';
import Input from '@/components/Input';
import { getAvailablePeriods } from '../selectors';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
  onChange: PropTypes.func,
};
const defaultProps = {
  dateStart: '',
  dateEnd: '',
  onChange: () => {},
};

const EntityDateRange = function EntityDateRange({
  dateStart,
  dateEnd,
  onChange,
}) {
  const dateFormat = 'YYYY-MM-DD';
  const isValidDate = (date) => dayjs(date).isValid();

  const periods = useSelector(getAvailablePeriods);

  const handleChangeDate = (e) => {
    const { name, value } = e?.target || {};
    if (!name) {
      return;
    }
    onChange({
      dateStart,
      dateEnd,
      [name]: formatDate(value, dateFormat),
    });
  };

  return (
    <div className={styles.wrapper}>
      <Input
        type="date"
        name="dateStart"
        value={(isValidDate(dateStart)
          ? formatDate(dateStart, dateFormat)
          : periods.dateStart || formatDate(dayjs(), dateFormat))}
        min={periods.dateStart}
        max={periods.dateEnd}
        onChange={handleChangeDate}
      />
      &nbsp;
      -
      &nbsp;
      <Input
        type="date"
        name="dateEnd"
        value={(isValidDate(dateEnd)
          ? formatDate(dateEnd, dateFormat)
          : periods.dateEnd || formatDate(dayjs(), dateFormat))}
        min={periods.dateStart}
        max={periods.dateEnd}
        onChange={handleChangeDate}
      />
    </div>
  );
};

EntityDateRange.propTypes = propTypes;
EntityDateRange.defaultProps = defaultProps;

export default EntityDateRange;
