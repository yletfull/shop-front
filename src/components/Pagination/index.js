import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import IconChevronLeft from '@/icons/ChevronLeft';
import IconChevronRight from '@/icons/ChevronRight';
import Button from '../Button';
import Select from '../Select';

import styles from './styles.module.scss';

const generateNumbers = (current, last, delta = 2) => {
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= last; i += 1) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  range.forEach((item) => {
    if (l) {
      if (item - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (item - l !== 1) {
        rangeWithDots.push('…');
      }
    }
    rangeWithDots.push(item);
    l = item;
  });

  return rangeWithDots;
};

const propTypes = {
  pagesTotal: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  count: PropTypes.number,
  countOptions: PropTypes.arrayOf(PropTypes.number),
  countText: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onPageSelect: PropTypes.func.isRequired,
  onCountSelect: PropTypes.func.isRequired,
};

const defaultProps = {
  count: null,
  countOptions: [],
  countText: 'Записей на странице',
  className: '',
  children: '',
};

const Pagination = function Pagination({
  pagesTotal,
  currentPage,
  count,
  countOptions,
  countText,
  className,
  children,
  onPageSelect,
  onCountSelect,
}) {
  if (pagesTotal < 1) {
    return null;
  }


  const createPageSelectHandler = (number) => (e) => {
    e.preventDefault();

    if (number >= 1 && number <= pagesTotal) {
      onPageSelect(number);
    }
  };

  const handleCountSelect = (value) => {
    onCountSelect(value);
  };

  const pageNumbers = generateNumbers(currentPage, pagesTotal);


  const options = countOptions.map((item) => ({
    value: String(item),
    text: String(item),
  }));

  return (
    <div
      className={cx([
        className,
        styles.wrapper,
      ])}
    >
      <nav className={styles.navigation}>
        <Button
          className={cx([
            styles.arrow,
            { [styles.disabled]: currentPage <= 1 },
          ])}
          appearance="control"
          disabled={currentPage <= 1}
          onClick={createPageSelectHandler(currentPage - 1)}
        >
          <IconChevronLeft />
        </Button>

        <div className={styles.numbers}>
          {pageNumbers.map((pageNumber) => {
            const isDisabled = typeof pageNumber === 'string' || pageNumber === currentPage;

            return (
              <Button
                key={pageNumber}
                appearance="control"
                className={cx([
                  styles.number,
                  { [styles.number_disabled]: isDisabled },
                ])}
                disabled={isDisabled}
                onClick={createPageSelectHandler(pageNumber)}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        <Button
          className={cx([
            styles.arrow,
            { [styles.disabled]: currentPage >= pagesTotal },
          ])}
          appearance="control"
          disabled={currentPage >= pagesTotal}
          onClick={createPageSelectHandler(currentPage + 1)}
        >
          <IconChevronRight />
        </Button>
      </nav>

      {children}

      {count}
      {options.length}
      {countOptions.length}
      {(count && options.length > 0) && (
        <div>
          <span>
            {countText}
          </span>
          <Select
            className={styles.select}
            options={options}
            value={String(count)}
            onInput={handleCountSelect}
          />
        </div>
      )}
    </div>
  );
};

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;
