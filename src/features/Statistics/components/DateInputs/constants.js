export const DATE_FORMAT = 'YYYY-MM-DD';

export const timeUnits = {
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
};

export const quickFilterOptions = [
  { text: 'вчера', unit: timeUnits.day, shift: 1 },
  { text: 'текущая неделя', unit: timeUnits.week, shift: 0 },
  { text: 'предыдущая неделя', unit: timeUnits.week, shift: 1 },
];

export const shiftTypes = {
  add: 'add',
  subtract: 'subtract',
};
