import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import { formatNumber } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func,
};

const defaultProps = {
  datasets: [],
  onClose: () => {},
};

const AttributeDatasetsForm = function AttributeDatasetsForm({
  datasets,
  onClose,
}) {
  return (
    <div className={styles.attributeDatasetsForm}>
      <form className={styles.attributeDatasetsHeaderSelectors}>
        <label>
          <input
            name="datasets-radio"
            type="radio"
            value="other"
          />
          Любой
        </label>
        <label>
          <input
            name="datasets-radio"
            type="radio"
            value="choose"
          />
          Выбрать из списка
        </label>
      </form>
      <div className={styles.attributeDatasetsFormTableWrapper}>
        <table className={styles.attributeDatasetsFormTable}>
          <tbody>
            <tr className={styles.trHeader}>
              <th className={styles.tdSelect}>
                <input type="checkbox" />
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
                <td className={styles.tdSelect}>
                  <input type="checkbox" />
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
      </div>

      <div className={styles.attributeDatasetsFormFooter}>
        <div className={styles.attributeDatasetsFormFooterCounter}>
          Выбрано:
          {' '}
          <b>
            0
          </b>
          {' '}
          из
          {' '}
          <b>
            0
          </b>
        </div>
        <div className={styles.attributeDatasetsFormFooterButtons}>
          <Button
            appearance="secondary"
            onClick={onClose}
          >
            отменить
          </Button>
          <Button>
            выбрать
          </Button>
        </div>
      </div>
    </div>
  );
};

AttributeDatasetsForm.propTypes = propTypes;
AttributeDatasetsForm.defaultProps = defaultProps;

export default AttributeDatasetsForm;
