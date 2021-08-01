import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  formatNumber,
  formatDate,
} from '@/utils/format';
import Button from '@/components/Button';
import InputCheckbox from '@/components/InputCheckbox';
import InputRadio from '@/components/InputRadio';
import Table, { TableRow, TableCell } from '@/components/Table';
import { mapStatisticsEntities } from '@/features/Segments/utils';
import styles from './styles.module.scss';

const propTypes = {
  readOnly: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      loadedAt: PropTypes.string,
      entityTypeTotals: PropTypes.arrayOf(
        PropTypes.shape({
          entityType: PropTypes.oneOf(['PHONE', 'EMAIL']),
          total: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
const defaultProps = {
  readOnly: false,
};

const getOptionId = (option) => `segmentConditionDataset_${option.id}`;

const Form = function SegmentConditionDatasetsSelectForm({
  readOnly,
  value,
  options,
  onReset,
  onSubmit,
}) {
  const [type, setType] = useState(
    !Array.isArray(value) || !value.length
      ? 'any'
      : 'listed',
  );
  const [checked, setChecked] = useState(value.map(String));
  const isEveryChecked = checked.length === options.length;
  const handleCheckedChange = (e, nextChecked) => setChecked(nextChecked);
  const handleEveryCheckedToggle = () => {
    if (readOnly) {
      return;
    }

    setChecked(isEveryChecked
      ? []
      : options.map((d) => String(d.id)));
  };

  const handleTypeChange = (e, nextType) => {
    if (readOnly) {
      return;
    }

    setType(nextType);
  };

  const handleReset = onReset;
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(type === 'any' ? [] : checked.map(Number));
  };

  const optionsList = readOnly && type === 'listed'
    ? options.filter((option) => value.includes(option.id))
    : options;

  return (
    <form
      action="#"
      className={styles.form}
      onSubmit={handleSubmit}
    >
      {!readOnly && (
        <div className={styles.formHeader}>
          <div className={styles.formHeaderRow}>
            <InputRadio
              className={styles.radio}
              checked={type}
              value="any"
              onChange={handleTypeChange}
            >
              <span className={styles.radioLabel}>
                Любой
                {readOnly && (
                  <small>
                    {' '}
                    (из доступных атрибутов)
                  </small>
                )}
              </span>
            </InputRadio>
          </div>
          <div className={styles.formHeaderRow}>
            <InputRadio
              className={styles.radio}
              checked={type}
              value="listed"
              onChange={handleTypeChange}
            >
              <span className={styles.radioLabel}>
                Выбрать из списка
              </span>
            </InputRadio>
          </div>
        </div>
      )}

      {(type !== 'any' || readOnly) && (
        <div className={styles.tableWrapper}>
          <Table
            className={styles.table}
            header={(
              <TableRow className={styles.tableHeader}>
                {!readOnly && (
                  <TableCell width="1">
                    <InputCheckbox
                      className={styles.checkbox}
                      id="segmentConditionDatasetsEvery"
                      checked={isEveryChecked}
                      onChange={handleEveryCheckedToggle}
                    />
                  </TableCell>
                )}
                <TableCell>
                  <label htmlFor="segmentConditionDatasetsEvery">
                    Название
                  </label>
                </TableCell>
                <TableCell
                  width="1"
                  nowrap
                >
                  Дата загрузки
                </TableCell>
                <TableCell
                  align="right"
                  width="1"
                >
                  Телефонов
                </TableCell>
                <TableCell
                  align="right"
                  width="1"
                  nowrap
                >
                  E-mail
                </TableCell>
              </TableRow>
            )}
          >
            {optionsList.map((option) => {
              const checkboxId = getOptionId(option);
              const statistics = mapStatisticsEntities(
                option.entityTypeTotals || [],
              );

              return (
                <TableRow
                  key={option.id}
                  className={styles.tableBody}
                >
                  {!readOnly && (
                    <TableCell width="1">
                      <InputCheckbox
                        className={styles.checkbox}
                        id={checkboxId}
                        value={String(option.id)}
                        checked={checked}
                        onChange={handleCheckedChange}
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <label htmlFor={checkboxId}>
                      {option.name}
                    </label>
                  </TableCell>
                  <TableCell
                    nowrap
                  >
                    {option.loadedAt
                      ? formatDate(option.loadedAt, 'DD.MM.YYYY HH:mm')
                      : '-'}
                  </TableCell>
                  <TableCell
                    align="right"
                    nowrap
                  >
                    {statistics.phone
                      ? formatNumber(statistics.phone)
                      : '-'}
                  </TableCell>
                  <TableCell
                    align="right"
                    nowrap
                  >
                    {statistics.email
                      ? formatNumber(statistics.email)
                      : '-'}
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
        </div>
      )}

      {!readOnly && (
        <div className={styles.footer}>
          <div className={styles.footerSummary}>
            {(type !== 'any') && (
              <span>
                Выбрано:
                <b>
                  {` ${checked.length} из ${options.length}`}
                </b>
              </span>
            )}
          </div>
          <div className={styles.footerButtons}>
            <Button
              className={styles.formButton}
              color="secondary"
              onClick={handleReset}
            >
              отменить
            </Button>
            <Button
              className={styles.formButton}
              type="submit"
            >
              выбрать
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
