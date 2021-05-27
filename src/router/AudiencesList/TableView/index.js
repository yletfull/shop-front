import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '@/components/Spinner';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  isFetching: PropTypes.bool,
};

const defaultProps = {
  data: [],
  isFetching: false,
};

const TableView = function TableView({
  data,
  isFetching,
}) {
  return (
    <div className={styles.wrapper}>
      {isFetching && (
        <Spinner />
      )}
      {!isFetching && JSON.stringify(data)}
    </div>
  );
};

TableView.propTypes = propTypes;
TableView.defaultProps = defaultProps;

export default TableView;
