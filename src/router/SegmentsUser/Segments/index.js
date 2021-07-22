import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@/hooks';
// import { formatDate, formatNumber } from '@/utils/format';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Table, { TableRow, TableCell } from '@/components/Table';
import { queryParams } from '../constants';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
};
const defaultProps = {
  data: [],
};

const Segments = function Segments({
  data,
}) {
  const history = useHistory();
  const query = useQuery();

  console.log(data);

  const [values, setValues] = useState({
    [queryParams.segmentId]: query.get(queryParams.segmentId) || '',
    [queryParams.segmentName]: query.get(queryParams.segmentName) || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e?.target || {};
    if (!name) {
      return;
    }
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    query.set(queryParams.segmentId, values[queryParams.segmentId] || '');
    query.set(queryParams.segmentName, values[queryParams.segmentName] || '');
    history.push({ search: query.toString() });
  };

  return (
    <div className={styles.segments}>
      <form onSubmit={handleFormSubmit}>
        <Table>
          <TableRow>
            <TableCell>
              <Input
                placeholder="ID"
                name={queryParams.segmentId}
                value={values[queryParams.segmentId]}
                onChange={handleInputChange}
              />
            </TableCell>
            <TableCell colSpan="5">
              <span>
                <Input
                  placeholder="Название"
                  name={queryParams.segmentName}
                  value={values[queryParams.segmentName]}
                  onChange={handleInputChange}
                />
                <Button type="submit">
                  найти
                </Button>
              </span>
            </TableCell>
          </TableRow>

          <TableRow type="header">
            <TableCell>
              ID
            </TableCell>
            <TableCell>
              Название
            </TableCell>
            <TableCell>
              Телеф.
            </TableCell>
            <TableCell>
              E-mail
            </TableCell>
            <TableCell>
              Файлы
            </TableCell>
            <TableCell>
              Посл. версия
            </TableCell>
          </TableRow>
        </Table>
      </form>
    </div>
  );
};

Segments.propTypes = propTypes;
Segments.defaultProps = defaultProps;

export default Segments;
