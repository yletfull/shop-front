import React from 'react';
import { Pagination } from '@mui/material';
import PropTypes from 'prop-types';
import Select from '@/components/Select';
import styles from './styles.module.scss';

const propTypes = {
  size: PropTypes.string,
  pagesCount: PropTypes.number,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  onPageSizeChange: PropTypes.func,
  onPageChange: PropTypes.func,
};

const defaultProps = {
  size: 'large',
  pagesCount: 1,
  pageSize: 6,
  pageSizeOptions: [
    {
      value: 6,
      text: 6,
    },
    {
      value: 12,
      text: 12,
    },

    {
      value: 18,
      text: 18,
    },
  ],
  onPageSizeChange: () => {},
  onPageChange: () => {},
};

const PaginationComponent = ({
  pagesCount,
  size,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  onPageChange,
}) => {
  const handlePageSizeChange = (data) => onPageSizeChange(data);

  return (
    <div className={styles.pagination}>
      <Pagination
        size={size}
        count={pagesCount}
        onChange={onPageChange}
      />

      <div className={styles.paginationCountWrapper}>
        <span>
          На одной странице:
        </span>

        <Select
          label={'Количество:'}
          options={pageSizeOptions}
          value={pageSize}
          onChange={handlePageSizeChange}
          required
        />
      </div>

    </div>
  );
};

PaginationComponent.propTypes = propTypes;
PaginationComponent.defaultProps = defaultProps;

export default PaginationComponent;
