import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatNumber } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  segmentsCount: PropTypes.number,
  uploadsCount: PropTypes.number,
  lastUpdateDate: PropTypes.string,
  lastUptateIdentifier: PropTypes.string,
};

const defaultProps = {
  segmentsCount: null,
  uploadsCount: null,
  lastUpdateDate: '',
  lastUptateIdentifier: '',
};

const CommonInfo = function CommonInfo({
  segmentsCount,
  uploadsCount,
  lastUpdateDate,
  lastUptateIdentifier,
}) {
  const getFullLastUpdateInfo = (
    date,
    identifier,
  ) => `${date} (Выгрузка ${identifier})`;

  const formattedLastUpdateDate = formatDate(
    lastUpdateDate,
    'DD.MM.YYYY HH:mm:ss',
  );

  return (
    <table className={styles.commonInfo}>
      <tbody>
        <tr>
          <td>
            Входит в сегменты
          </td>
          <td>
            {formatNumber(segmentsCount)}
          </td>
        </tr>
        <tr>
          <td>
            Входит в выгрузки
          </td>
          <td>
            {formatNumber(uploadsCount)}
          </td>
        </tr>
        <tr>
          <td>
            Последний апдейт
          </td>
          <td>
            {formattedLastUpdateDate && getFullLastUpdateInfo(
              formattedLastUpdateDate,
              lastUptateIdentifier,
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

CommonInfo.propTypes = propTypes;
CommonInfo.defaultProps = defaultProps;

export default CommonInfo;
