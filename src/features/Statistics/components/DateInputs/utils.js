import dayjs from 'dayjs';
import { TIME_UNITS, DATE_FORMAT, shiftTypes } from './constants';

const { day, week, month, year } = TIME_UNITS;

export const getShiftUnits = ({ dateStart, dateEnd }) => {
  if ((dateStart.month() === 0 && dateStart.date() === 1)
    && (dateEnd.month() === 11 && dateEnd.date() === 31)) {
    return [year, 1];
  }
  if (
    (dateStart.date() === 1) && dateEnd.date() === dateEnd.daysInMonth()
  ) {
    return [month, 1];
  }
  if (dateStart.day() === 1 && dateEnd.day() === 0) {
    return [week, 1];
  }
  return [day, dateEnd.diff(dateStart, day) + 1];
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
