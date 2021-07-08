import React from 'react';
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
