import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useService } from '@/hooks';
import dayjs from '@/utils/day';
import { formatDate } from '@/utils/format';
import Input from '@/components/Input';
import service from './service';
import styles from './styles.module.scss';

const propTypes = {
  dateStart: PropTypes.string,
  dateEnd: PropTypes.string,
  onChange: PropTypes.func,
  onChangeLimits: PropTypes.func,
};
const defaultProps = {
  dateStart: '',
  dateEnd: '',
  onChange: () => {},
  onChangeLimits: () => {},
};

const EntityDateRange = function EntityDateRange({
  dateStart,
  dateEnd,
  onChange,
  onChangeLimits,
}) {
  const dateFormat = 'YYYY-MM-DD';
  const isValidDate = (date) => dayjs(date).isValid();

  const { fetch, data } = useService({
    initialData: {},
    service: service.fetchPeriods,
  });

  useEffect(() => {
    fetch();
  }, [fetch]);

  const periods = useMemo(() => {
    const { datestart, dateend } = data[0] || {};
    return ({
      dateStart: datestart,
      dateEnd: dateend,
    });
  }, [data]);

  useEffect(() => {
    if (dateStart || dateEnd || !periods.dateStart || !periods.dateEnd) {
      return;
    }
    onChangeLimits(periods);
  }, [dateStart, dateEnd, periods, onChangeLimits]);

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
