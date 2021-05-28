import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { useQuery } from '@/hooks';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
};

const defaultProps = {
  data: {},
};

const Comparison = function Comparison({ data }) {
  const queryParams = {
    searchIdentifier: 'id',
  };

  const history = useHistory();
  const query = useQuery();

  const [
    searchIdentifier,
    setSearchIdentifier,
  ] = useState(query.get(queryParams.searchIdentifier) || '');

  const handleSubmitFilter = (values) => {
    setSearchIdentifier(values[queryParams.searchIdentifier]);
    query.set(
      queryParams.searchIdentifier,
      values[queryParams.searchIdentifier],
    );
    history.push({ search: query.toString() });
  };

  const audienceName = data.name || '';

  return (
    <div className={styles.comparison}>
      <div className={styles.comparisonFilter}>
        <Form
          initialValues={{
            [queryParams.searchIdentifier]: searchIdentifier,
          }}
          onSubmit={handleSubmitFilter}
        >
          {({ handleSubmit }) => (
            <form
              className={styles.comparisonFilterForm}
              onSubmit={handleSubmit}
            >
              <Field name={queryParams.searchIdentifier}>
                {({ input }) => (
                  <Input
                    name={input.name}
                    value={input.value}
                    onChange={input.onChange}
                    type="text"
                    placeholder="Название признака"
                  />
                )}
              </Field>
              <Button
                type="submit"
              >
                Найти
              </Button>
            </form>
          )}
        </Form>
      </div>

      <table className={styles.comparisonTable}>
        <tbody>
          <tr>
            <th>
              Название признака
            </th>
            <th>
              {audienceName}
            </th>
            <th>
              Глобальная аудитория
            </th>
            <th>
              Пересечение
            </th>
            <th>
              %
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Comparison.propTypes = propTypes;
Comparison.defaultProps = defaultProps;

export default Comparison;
