import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const propTypes = {
  inputValue: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {};

const SearchForm = function SearchForm({ inputValue, onSubmit }) {
  const [userName, setUserName] = useState(inputValue);

  useEffect(() => {
    setUserName(inputValue);
  }, [inputValue]);

  const handleChangeUserName = (value) => {
    setUserName(value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(userName);
  };

  return (
    <form
      className={styles.searchForm}
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        id="username"
        name="username"
        value={userName}
        onChange={handleChangeUserName}
      />
      <button
        type="submit"
      >
        Найти
      </button>
    </form>
  );
};

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
