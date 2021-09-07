import dayjs from 'dayjs';
import { TIME_UNITS, DATE_FORMAT, shiftTypes } from './constants';

const { day, week, month, year } = TIME_UNITS;

export const getShiftUnits = ({ dateStart, dateEnd }) => {
  if ((dateStart.month() === 0 && dateStart.date() === 1)
    && (dateEnd.month() === 11 && dateEnd.date() === 31)) {
    return year;
  }
  if (
    (dateStart.date() === 1) && dateEnd.date() === dateEnd.daysInMonth()
  ) {
    return month;
  }
  if (dateStart.day() === 1 && dateEnd.day() === 0) {
    return week;
  }
  return day;
};

export const getShiftInterval = ({
  dateStart,
  dateEnd,
  action = shiftTypes.add,
}) => {
  const units = getShiftUnits({ dateStart, dateEnd });
  const today = dayjs();

  const shift = Math.max(
    1,
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
