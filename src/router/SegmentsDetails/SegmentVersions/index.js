import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  data: [],
};

const SegmentVersions = function SegmentVersions({ data }) {
  return (
    <table className={styles.segmentVersions}>
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

        {data.map((row) => (
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
  );
};

SegmentVersions.propTypes = propTypes;
SegmentVersions.defaultProps = defaultProps;

export default SegmentVersions;
