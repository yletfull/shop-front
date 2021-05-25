import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
};

const defaultProps = {
  data: {},
};

const SegmentInfo = function SegmentInfo({ data }) {
  return (
    <table className={styles.segmentInfo}>
      <tbody>
        <tr>
          <td>
            ID
          </td>
          <td>
            {data.id}
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
  );
};

SegmentInfo.propTypes = propTypes;
SegmentInfo.defaultProps = defaultProps;

export default SegmentInfo;
