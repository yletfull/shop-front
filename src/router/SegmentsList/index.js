import React from 'react';
import { formatNumber } from '@/utils/format';
import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import styles from './styles.module.scss';

const SegmentsList = function SegmentsList() {
  const tableData = [];
  return (
    <AppLayout headerTitle="Сегменты и выгрузки">
      <div className={styles.controls}>
        <Button
          appearance="control"
          className={styles.controlsAdd}
          disabled
        >
          Новый сегмент
        </Button>
        <Button
          appearance="control"
          className={styles.controlsFind}
          disabled
        >
          Найти пользователя
        </Button>
      </div>

      <table className={styles.table}>
        <tbody>
          <tr>
            <th>
              ID
            </th>
            <th>
              Название
            </th>
            <th>
              E-mail
            </th>
            <th>
              Телефонов
            </th>
            <th>
              Скачать файлы для площадок
            </th>
            <th>
              Версий
            </th>
            <th>
              Последняя версия от
            </th>
            <th>
              Доступны новые идентификаторы
            </th>
            <th aria-label="Пересчитать" />
          </tr>

          {tableData.map((row) => (
            <tr key={row.id}>
              <td>
                {row.id}
              </td>
              <td>
                {row.name}
              </td>
              <td>
                {formatNumber(row.emailsCount)}
              </td>
              <td>
                {formatNumber(row.phonesCount)}
              </td>
              <td>
                {row.download}
              </td>
              <td>
                {row.version}
              </td>
              <td>
                {row.versionDate}
              </td>
              <td>
                {row.newIdentificators}
              </td>
              <td>
                Пересчитать
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  );
};

export default SegmentsList;
