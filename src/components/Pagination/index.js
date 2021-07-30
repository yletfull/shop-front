import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import IconChevronLeft from '@/icons/ChevronLeft';
import IconChevronRight from '@/icons/ChevronRight';
import Select from '../Select';
import { generateNumbers } from './utils';
import styles from './styles.module.scss';

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

  const handleNavClick = (e) => {
    const { value } = e.target.dataset;

    if (!value) {
      return;
    }

    onPageSelect(Math.max(0, Math.min(pagesTotal, Number(value))));
  };

  const handleCountSelect = (e) => {
    onCountSelect(Number(e.target.value));
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
      <nav
        role="presentation"
        className={styles.navigation}
        onClick={handleNavClick}
      >
        <button
          type="button"
          className={cx([
            styles.arrow,
            { [styles.disabled]: currentPage <= 1 },
          ])}
          disabled={currentPage <= 1}
          data-value={currentPage - 1}
        >
          <IconChevronLeft />
        </button>

        <div className={styles.numbers}>
          {pageNumbers.map((pageNumber) => {
            const isDisabled = typeof pageNumber === 'string' || pageNumber === currentPage;

            return (
              <button
                type="button"
                key={pageNumber}
                className={cx([
                  styles.number,
                  { [styles.disabled]: isDisabled },
                ])}
                disabled={isDisabled}
                data-value={pageNumber}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={cx([
            styles.arrow,
            { [styles.disabled]: currentPage >= pagesTotal },
          ])}
          disabled={currentPage >= pagesTotal}
          data-value={currentPage + 1}
        >
          <IconChevronRight />
        </button>
      </nav>
      {children}
      {(count && options.length > 0) && (
        <div>
          <span>
            {countText}
          </span>
          <Select
            className={styles.select}
            options={options}
            value={String(count)}
            required
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
