import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/ru';

dayjs.extend(duration);
dayjs.locale('ru');

export default dayjs;
