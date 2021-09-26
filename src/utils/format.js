import dayjs from './day';

export const formatDate = (value, format = 'DD.MM.YYYY') => {
  if (dayjs(value).isValid()) {
    return dayjs(value).format(format);
  }
  return value;
};

export const formatToDate = (date) => dayjs(date).toDate();
export const formatToUnix = (date) => dayjs(date).unix();

export const formatNumber = (value) => Number(value).toLocaleString('ru-RU');

export const formatPercent = (value) => {
  const result = value > 0 && value <= 0.01
    ? Math.round(value * 10000) / 100
    : Math.round(value * 100);
  return `${formatNumber(result)}%`;
};


export const formatPlural = (value, one, few, many) => {
  let n = Math.abs(Math.round(value)) % 100;

  if (n >= 5 && n <= 20) {
    return many;
  }

  n %= 10;

  if (n === 1) {
    return one;
  }

  if (n > 1 && n < 5) {
    return few;
  }

  return many;
};

export const formatTimeDurationOfModelRunning = ({
  start,
  end = dayjs(),
}) => {
  const duration = dayjs.duration(dayjs(end).diff(start));
  const values = {
    days: Math.floor(duration.asDays()),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  };
  const timeUnits = {
    days: ['день', 'дня', 'дней'],
    hours: ['час', 'часа', 'часов'],
    minutes: ['минута', 'минуты', 'минут'],
    seconds: ['секунда', 'секунды', 'секунд'],
  };

  let resultPeriods = null;

  if (duration.asSeconds() < 60) {
    resultPeriods = ['seconds'];
  } else if (values.days > 0) {
    resultPeriods = ['days', 'hours'];
  } else {
    resultPeriods = ['hours', 'minutes'];
  }

  return resultPeriods
    .filter((item) => values[item])
    .reduce((acc, period) => ([
      acc,
      values[period],
      formatPlural(values[period], ...timeUnits[period]),
    ].join(' ')), '');
};

export const formatCTR = (value) => {
  const result = (value * 100).toFixed(2).toString().replace(/\./g, ',');

  return `${result}%`;
};
