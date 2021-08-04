import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, formatNumber } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  children: PropTypes.node,
  data: PropTypes.shape({
    local: PropTypes.false,
    loadedAt: PropTypes.string,
    totalEntities: PropTypes.number,
  }),
};

const defaultProps = {
  children: null,
  data: {},
};

const CommonInfo = function CommonInfo({
  children,
  data,
}) {
  const { local, loadedAt, totalEntities } = data || {};

  return (
    <div className={styles.commonInfo}>
      <div className={styles.commonInfoColumn}>
        <table className={styles.commonInfoTable}>
          <tbody>
            <tr>
              <td>
                Тип
              </td>
              <td>
                {local ? 'Локальная' : 'Глобальная'}
              </td>
            </tr>
            <tr>
              <td>
                Дата загрузки
              </td>
              <td>
                {formatDate(loadedAt)}
              </td>
            </tr>
            <tr>
              <td>
                Всего валидных идентификаторов
              </td>
              <td>
                {formatNumber(totalEntities || 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.commonInfoColumn}>
        {children}
      </div>
    </div>
  );
};

CommonInfo.propTypes = propTypes;
CommonInfo.defaultProps = defaultProps;

export default CommonInfo;
