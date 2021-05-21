import React from 'react';
import { useParams } from 'react-router-dom';
import { formatNumber } from '@/utils/format';
import AppLayout from '@/components/AppLayout';
import Button from '@/components/Button';
import styles from './styles.module.scss';

const SegmentsDetails = function SegmentsDetails() {
  const { id: segmentId } = useParams();
  const data = {};
  const meta = [];
  return (
    <AppLayout headerTitle={`Сегмент #${segmentId}`}>
      <div className={styles.controls}>
        <Button
          appearance="control"
          className={styles.controlsEdit}
          disabled
        >
          Изменить сегмент
        </Button>
        <Button
          appearance="control"
          className={styles.controlsUpdate}
          disabled
        >
          Пересчитать
        </Button>
        <Button
          appearance="control"
          className={styles.controlsRemove}
          disabled
        >
          В архив
        </Button>
      </div>

      <table>
        <tbody>
          <tr>
            <td>
              ID
            </td>
            <td>
              {data.id || segmentId}
            </td>
          </tr>
          <tr>
            <td>
              Название
            </td>
            <td>
              {data.name}
            </td>
          </tr>
          <tr>
            <td>
              E-mail
            </td>
            <td>
              {formatNumber(data.emailsCount)}
            </td>
          </tr>
          <tr>
            <td>
              Телефонов
            </td>
            <td>
              {formatNumber(data.phonesCount)}
            </td>
          </tr>
          <tr>
            <td>
              Последний расчёт
            </td>
            <td>
              {data.date}
            </td>
          </tr>
          <tr>
            <td>
              Доступны новые идентификаторы
            </td>
            <td>
              {data.indetificators}
            </td>
          </tr>
        </tbody>
      </table>

      <h2>
        Аудитория
      </h2>

      <h2>
        Версии сегмента и файлы для площадок
      </h2>

      <table className={styles.table}>
        <tbody>
          <tr>
            <th>
              Дата
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
          </tr>

          {meta.map((row) => (
            <tr key={row.id}>
              <td>
                {row.date}
              </td>
              <td>
                {formatNumber(row.emailsCount)}
              </td>
              <td>
                {formatNumber(row.phonesCount)}
              </td>
              <td>
                {row.files}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  );
};

export default SegmentsDetails;
