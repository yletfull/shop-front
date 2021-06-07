import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import { formatNumber } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  datasets: [],
};

const AttributeDatasetsForm = function AttributeDatasetsForm({
  datasets,
}) {
  return (
    <div className={styles.attributeDatasetsForm}>
      <table className={styles.attributeDatasetsFormTable}>
        <tbody>
          <tr>
            <th>
              Название
            </th>
            <th>
              Дата загрузки
            </th>
            <th>
              Телефонов
            </th>
            <th>
              E-mail
            </th>
          </tr>

          {(!datasets || !Array.isArray(datasets)) && (
            <tr>
              <td colSpan="4">
                Нет данных
              </td>
            </tr>
          )}

          {datasets.map((d) => (
            <tr key={d}>
              <td>
                {d}
              </td>
              <td>
                -
              </td>
              <td>
                {formatNumber(0)}
              </td>
              <td>
                {formatNumber(0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.attributeDatasetsFormFooter}>
        <div className={styles.attributeDatasetsFormFooterSection}>
          <span>
            Выбрано: 0 из 0
          </span>
        </div>
        <div className={styles.attributeDatasetsFormFooterSection}>
          <Button>
            отменить
          </Button>
          <Button>
            выбрать
          </Button>
        </div>
        <div className={styles.attributeDatasetsFormFooterSection} />
      </div>
    </div>
  );
};

AttributeDatasetsForm.propTypes = propTypes;
AttributeDatasetsForm.defaultProps = defaultProps;

export default AttributeDatasetsForm;
