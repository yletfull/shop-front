import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/ru';

dayjs.extend(duration);
dayjs.locale('ru');

export const getDatesRange = (from, to, unit = 'd') => {
  if (!from || !to) {
    return [];
  }
  const diff = dayjs(to).diff(dayjs(from), unit);
  if (diff < 0) {
    return [];
  }
  return [...Array(diff + 1).keys()]
    .map((i) => dayjs(from).add(i, unit));
};

export default dayjs;
