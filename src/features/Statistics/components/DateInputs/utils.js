import dayjs from 'dayjs';
import { timeUnits, shiftTypes, DATE_FORMAT } from './constants';

export const getShiftUnits = ({ dateStart, dateEnd }) => {
  if ((dateStart.month() === 0 && dateStart.date() === 1)
    && (dateEnd.month() === 11 && dateEnd.date() === 31)) {
    return [timeUnits.year, 1];
  }
  if (
    (dateStart.date() === 1) && dateEnd.date() === dateEnd.daysInMonth()
  ) {
    return [timeUnits.month, 1];
  }
  if (dateStart.day() === 1 && dateEnd.day() === 0) {
    return [timeUnits.week, 1];
  }
  return [timeUnits.day, dateEnd.diff(dateStart, timeUnits.day) + 1];
};

export const getShiftInterval = ({
  dateStart,
  dateEnd,
  action = shiftTypes.add,
}) => {
  const [units, diff] = getShiftUnits({ dateStart, dateEnd });
  const today = dayjs();

  const shift = Math.max(
    diff,
    Math.min(
      dateEnd.diff(dateStart, units),
      today.diff(dateEnd, units),
    ),
  );

  const newDateStart = dateStart[action](shift, units)
    .startOf(units)
    .format(DATE_FORMAT);

  const newDateEnd = dateEnd[action](shift, units)
    .endOf(units)
    .format(DATE_FORMAT);

  return {
    dateStart: newDateStart,
    dateEnd: newDateEnd,
  };
};

export const validationDates = ({ dateStart, dateEnd }) => {
  if (dayjs(dateStart).diff(dateEnd) > 0) {
    return { dateStart: dateEnd, dateEnd };
  }
  return { dateStart, dateEnd };
};

export const dateCheckRange = (date, min, max) => (
  dayjs(date) < dayjs(min)
  || dayjs(date) > dayjs(max)
);
