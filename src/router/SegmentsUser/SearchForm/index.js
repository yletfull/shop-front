import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './styles.module.scss';

const propTypes = {
  user: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};

const defaultProps = {
  onSubmit: () => {},
};

const SearchForm = function SearchForm({
  user,
  onSubmit,
}) {
  const [values, setValues] = useState({ user });

  const handleFormChange = (e) => {
    const { name, value } = e?.target || {};
    if (!name) {
      return;
    }
    setValues({ ...values, [name]: value || '' });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form
      className={styles.searchForm}
      onSubmit={handleFormSubmit}
    >
      <Input
        name="user"
        value={values.user}
        onChange={handleFormChange}
      />
      <Button type="submit">
        найти
      </Button>
    </form>
  );
};

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
