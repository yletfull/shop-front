import React from 'react';
import IconChevronDown from '@/icons/ChevronDown';
import NumberGrowth from '@/components/NumberGrowth';
import styles from './styles.module.scss';
import Table, { TableRow, TableCell } from './index';

export default {
  title: 'Components/Table',
  component: Table,
};

export const SegmentsList = (args) => {
  const linksHref = '#';
  const data = [
    { id: 'd41ccfa0', title: 'Эксперимент Филадельфия', phones: '58 166', emails: '99 151', newPhones: '+200', newEmails: '+400', versions: 1, latestVersion: '23.09.2021' },
    { id: 'd1560bb1', title: 'Владельцы красных машин', phones: '76 561', emails: '58 165', newPhones: '+167', newEmails: '+157', versions: 4, latestVersion: '20.09.2021' },
    { id: '4f00c166', title: 'Мой сегмент 4', phones: '25 666', emails: '77 151', newPhones: '', newEmails: '', versions: 1, latestVersion: '15.09.2021' },
    { id: 'fa005aee', title: 'Пенсионеры района Пресненский', phones: '44 004', emails: '11 956', newPhones: '', newEmails: '', versions: 5, latestVersion: '11.08.2021' },
    { id: 'bb590dd8', title: 'Богатые милфы', phones: '92 709', emails: '88 177', newPhones: '+2 400', newEmails: '+5 600', versions: 2, latestVersion: '08.07.2021' },
  ];

  return (
    <Table
      {...args}
      header={(
        <TableRow type="header">
          <TableCell width="1">
            ID
          </TableCell>
          <TableCell>
            Название
          </TableCell>
          <TableCell align="right">
            Телеф.
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            E-mail
          </TableCell>
          <TableCell />
          <TableCell>
            Файлы
          </TableCell>
          <TableCell>
            Доступны новые идентиф.
          </TableCell>
          <TableCell width="1">
            Версий
          </TableCell>
          <TableCell align="right">
            Посл. версия
          </TableCell>
        </TableRow>
      )}
    >
      {data.map((row) => (
        <TableRow
          key={row.id}
        >
          <TableCell>
            <a href={linksHref}>
              {row.id}
            </a>
          </TableCell>
          <TableCell>
            {row.title}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            {row.phones}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            {row.emails}
          </TableCell>
          <TableCell />
          <TableCell>
            <a
              href={linksHref}
              style={{ marginRight: '.75em' }}
            >
              VK
            </a>
            <a href={linksHref}>
              FB
            </a>
          </TableCell>
          <TableCell>
            {row.newEmails && (
              <span style={{ marginRight: '1em', whiteSpace: 'nowrap' }}>
                E-mail:
                {' '}
                <b>
                  {row.newEmails}
                </b>
              </span>
            )}
            {row.newPhones && (
              <span style={{ whiteSpace: 'nowrap' }}>
                Телеф.:
                {' '}
                <b>
                  {row.newPhones}
                </b>
              </span>
            )}
          </TableCell>
          <TableCell>
            {row.versions}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            {row.latestVersion}
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export const Statistics = (args) => {
  const data = [
    { index: 1, title: 'Парки Москвы', inWork: '8 166', inWorkDiff: 1.56, active: '8 166', activeDiff: 1.56, paused: '8 166', pausedDiff: 1.56, finished: '41 616', finishedDiff: 1.56, total: '51 616', totalDiff: 1.56 },
    { index: 2, title: 'Ярмарки выходного дня 2021', inWork: '6 561', inWorkDiff: 0.51, active: '6 561', activeDiff: 0.51, paused: '6 561', pausedDiff: 0.51, finished: '16 119', finishedDiff: 0.51, total: '72 888', totalDiff: 0.51 },
    { index: 3, title: 'Веломарафон', inWork: '5 666', inWorkDiff: 0.11, active: '5 666', activeDiff: 0.11, paused: '5 666', pausedDiff: 0.11, finished: '551', finishedDiff: 0.11, total: '66 772', totalDiff: 0.11 },
    { index: 4, title: 'Реновация', inWork: '4 004', inWorkDiff: -0.05, active: '4 004', activeDiff: -0.05, paused: '4 004', pausedDiff: -0.05, finished: '881', finishedDiff: -0.05, total: '11 620', totalDiff: -0.05 },
    { index: 5, title: 'Строительство ОДС', inWork: '2 709', inWorkDiff: 0.41, active: '2 709', activeDiff: 0.41, paused: '2 709', pausedDiff: 0.41, finished: '156', finishedDiff: 0.41, total: '55 169', totalDiff: 0.41 },
  ];
  const total = { title: 'Всего', inWork: '32 567', inWorkDiff: 1.22, active: '32 567', activeDiff: 1.22, paused: '32 567', pausedDiff: 1.22, finished: '51 167', finishedDiff: 0.91, total: '188 995', totalDiff: 1.44 };

  const formatter = (d) => `${d * 100}%`;

  return (
    <Table
      {...args}
      header={(
        <TableRow type="header">
          <TableCell width="1" />
          <TableCell>
            Задача
          </TableCell>
          <TableCell
            align="right"
            width="1"
            nowrap
          >
            В работе
          </TableCell>
          <TableCell
            align="right"
            width="1"
            nowrap
          >
            <IconChevronDown style={{ fontSize: '.5rem' }} />
          </TableCell>
          <TableCell
            align="right"
            width="1"
            nowrap
          >
            Активные
          </TableCell>
          <TableCell
            align="right"
            width="1"
            nowrap
          >
            <IconChevronDown style={{ fontSize: '.5rem' }} />
          </TableCell>
          <TableCell
            align="right"
            width="1"
            nowrap
          >
            На паузе
          </TableCell>
          <TableCell
            align="right"
            width="1"
            nowrap
          >
            <IconChevronDown style={{ fontSize: '.5rem' }} />
          </TableCell>
          <TableCell
            align="right"
            width="1"
            nowrap
          >
            Завершены
          </TableCell>
          <TableCell
            align="right"
            width="1"
            nowrap
          >
            <IconChevronDown style={{ fontSize: '.5rem' }} />
          </TableCell>
          <TableCell
            align="right"
            width="1"
            nowrap
          >
            Всего
          </TableCell>
          <TableCell
            align="right"
            width="1"
            nowrap
          >
            <IconChevronDown style={{ fontSize: '.5rem' }} />
          </TableCell>
        </TableRow>
      )}
      footer={(
        <TableRow type="summary">
          <TableCell />
          <TableCell
            className={styles.bold}
          >
            {total.title}
          </TableCell>
          <TableCell
            align="right"
            nowrap
            className={styles.bold}
          >
            {total.inWork}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            <NumberGrowth
              value={total.inWorkDiff}
              formatter={formatter}
            />
          </TableCell>
          <TableCell
            align="right"
            nowrap
            className={styles.bold}
          >
            {total.active}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            <NumberGrowth
              value={total.activeDiff}
              formatter={formatter}
            />
          </TableCell>
          <TableCell
            align="right"
            nowrap
            className={styles.bold}
          >
            {total.paused}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            <NumberGrowth
              value={total.pausedDiff}
              formatter={formatter}
            />
          </TableCell>
          <TableCell
            align="right"
            nowrap
            className={styles.bold}
          >
            {total.finished}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            <NumberGrowth
              value={total.finishedDiff}
              formatter={formatter}
            />
          </TableCell>
          <TableCell
            align="right"
            nowrap
            className={styles.bold}
          >
            {total.total}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            <NumberGrowth
              value={total.totalDiff}
              formatter={formatter}
            />
          </TableCell>
        </TableRow>
      )}
    >
      {data.map((row) => (
        <TableRow key={row.title}>
          <TableCell style={{ color: '#999da3' }}>
            {`${row.index}.`}
          </TableCell>
          <TableCell>
            {row.title}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            {row.inWork}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            <NumberGrowth
              value={row.inWorkDiff}
              formatter={formatter}
            />
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            {row.active}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            <NumberGrowth
              value={row.activeDiff}
              formatter={formatter}
            />
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            {row.paused}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            <NumberGrowth
              value={row.pausedDiff}
              formatter={formatter}
            />
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            {row.finished}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            <NumberGrowth
              value={row.finishedDiff}
              formatter={formatter}
            />
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            {row.total}
          </TableCell>
          <TableCell
            align="right"
            nowrap
          >
            <NumberGrowth
              value={row.totalDiff}
              formatter={formatter}
            />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
};
