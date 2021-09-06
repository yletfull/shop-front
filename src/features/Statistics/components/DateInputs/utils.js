import dayjs from 'dayjs';
import { TIME_UNITS, DATE_FORMAT } from './constants';

const { day, week, month, year } = TIME_UNITS;

const getShiftUnits = ({ dateStart, dateEnd }) => {
  if ((dateStart.month() === 0 && dateStart.date() === 1)
    && (dateEnd.month() === 11 && dateEnd.date() === 31)) {
    return year;
  } if (
    (dateStart.date() === 1) && dateEnd.date() === dateEnd.daysInMonth()
  ) {
    return month;
  } if (dateStart.day() === 1 && dateEnd.day() === 0) {
    return week;
  }
  return day;
};

export const getPastShiftInterval = ({ dateStart, dateEnd, min, max }) => {
  const units = getShiftUnits({ dateStart, dateEnd });
  const today = dayjs();

  const shift = Math.max(
    1,
    Math.min(
      dateEnd.diff(dateStart, units),
      today.diff(dateEnd, units),
    ),
  );

  const newDateStart = dayjs(Math.max(
    dateStart.subtract(shift, units).valueOf(),
    dayjs(min).valueOf(),
  )).startOf(units).format(DATE_FORMAT);

  const newDateEnd = dayjs(Math.min(
    dateEnd.subtract(shift, units).valueOf(),
    dayjs(max).valueOf(),
  )).endOf(units).format(DATE_FORMAT);

  return {
    dateStart: newDateStart,
    dateEnd: newDateEnd,
  };
};

export const getFutureShiftInterval = ({ dateStart, dateEnd }) => {
  const units = getShiftUnits({ dateStart, dateEnd });
  const today = dayjs();

  const shift = Math.max(
    1,
    Math.min(
      dateEnd.diff(dateStart, units),
      today.diff(dateEnd, units),
    ),
  );

  const newDateStart = dateStart.add(shift, units)
    .startOf(units)
    .format(DATE_FORMAT);

  const newDateEnd = dateEnd.add(shift, units)
    .endOf(units)
    .format(DATE_FORMAT);

  return {
    dateStart: newDateStart,
    dateEnd: newDateEnd,
  };
};
