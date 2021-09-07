export const DATE_FORMAT = 'YYYY-MM-DD';

export const TIME_UNITS = {
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
};

export const quickFilterOptions = [
  { text: 'вчера', unit: TIME_UNITS.day, shift: 1 },
  { text: 'предыдущая неделя', unit: TIME_UNITS.week, shift: 1 },
];

export const shiftTypes = {
  add: 'add',
  subtract: 'subtract',
};
