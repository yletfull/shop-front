import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '@/utils/format';
import Button from '@/components/Button';
import Spinner from '@/components/Spinner';
import Table, { TableRow, TableCell } from '@/components/Table';
import {
  getAttributesData,
  getIsFetchingAttributes,
} from '../selectors';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const Attributes = function Attributes() {
  const attributes = useSelector(getAttributesData);
  const isFetching = useSelector(getIsFetchingAttributes);

  const generateKey = (prefix, name, index) => `${prefix}-${name}-${index}`;
  const isEmpty = !isFetching && (!attributes || attributes.length === 0);
  const hasData = !isFetching
    && Array.isArray(attributes)
    && attributes.length > 0;

  const [opened, setOpened] = useState([]);

  const handleClickToggleButton = (e) => {
    const { key } = e?.target?.dataset || {};
    if (!key) {
      return;
    }
    const index = opened.indexOf(key);
    setOpened(index === (-1)
      ? [...opened, key]
      : [...opened.slice(0, index), ...opened.slice(index + 1)]);
  };

  return (
    <div className={styles.attributes}>
      <Table className={styles.attributesTable}>
        <TableRow type="header">
          <TableCell>
            Наименование
          </TableCell>
          <TableCell>
            Значение
          </TableCell>
          <TableCell>
            Дата
          </TableCell>
        </TableRow>

        {isFetching && (
          <TableRow>
            <TableCell colSpan="3">
              <span className={styles.attributesTableEmpty}>
                <Spinner />
              </span>
            </TableCell>
          </TableRow>
        )}

        {isEmpty && (
          <TableRow>
            <TableCell colSpan="3">
              <span className={styles.attributesTableEmpty}>
                Нет данных
              </span>
            </TableCell>
          </TableRow>
        )}

        {hasData && attributes.map((attribute, attributeIndex) => {
          const { lastValue, values } = attribute || {};
          const key = generateKey('lastValue', lastValue.name, attributeIndex);
          const isOpened = opened.includes(key);

          return (
            <Fragment key={key}>
              <TableRow data-opened={String(isOpened)}>
                <TableCell>
                  <span className={styles.attributesTableCell}>
                    <Button
                      appearance="control"
                      className={styles.attributesTableButton}
                      data-key={key}
                      onClick={handleClickToggleButton}
                    >
                      {isOpened ? '-' : '+'}
                    </Button>
                    <span className={styles.attributesTableName}>
                      {lastValue.name}
                      {Boolean(lastValue.profileTitle) && (
                        <span className={styles.attributesTableNameSub}>
                          {lastValue.profileTitle}
                        </span>
                      )}
                    </span>
                  </span>
                </TableCell>
                <TableCell>
                  <span className={styles.attributesTableLastValue}>
                    {lastValue.value}
                  </span>
                </TableCell>
                <TableCell title={lastValue.datasetTitle}>
                  <span className={styles.attributesTableLastValue}>
                    {formatDate(lastValue.createdAt)}
                  </span>
                </TableCell>
              </TableRow>
              {isOpened && values.map((value, valueIndex) => (
                <TableRow key={generateKey('value', value.name, valueIndex)}>
                  <TableCell />
                  <TableCell>
                    <span className={styles.attributesTableHistoryValue}>
                      {value.value}
                    </span>
                  </TableCell>
                  <TableCell title={lastValue.datasetTitle}>
                    <span className={styles.attributesTableHistoryValue}>
                      {formatDate(value.createdAt)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          );
        })}
      </Table>
    </div>
  );
};

Attributes.propTypes = propTypes;
Attributes.defaultProps = defaultProps;

export default Attributes;
