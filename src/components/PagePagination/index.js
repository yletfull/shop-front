import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@/utils/format';
import IconChevronLeft from '@/icons/ChevronLeft';
import IconChevronRight from '@/icons/ChevronRight';
import styles from './styles.module.scss';

const propTypes = {
  page: PropTypes.number,
  numberOfPages: PropTypes.number,
  numberOfVisiblePages: PropTypes.number,
  count: PropTypes.number,
  countOptions: PropTypes.arrayOf(PropTypes.number),
  isDisabled: PropTypes.bool,
  isShowCountOptions: PropTypes.bool,
  isShowGoToPage: PropTypes.bool,
  onChangeCount: PropTypes.func,
  onChangePage: PropTypes.func,
};

const defaultProps = {
  page: 1,
  numberOfPages: 1,
  numberOfVisiblePages: 5,
  count: 20,
  countOptions: [20, 50, 100],
  isDisabled: false,
  isShowCountOptions: false,
  isShowGoToPage: false,
  onChangeCount: () => {},
  onChangePage: () => {},
};

const PagePagination = function PagePagination({
  page,
  numberOfPages,
  numberOfVisiblePages,
  count,
  countOptions,
  isDisabled,
  isShowCountOptions,
  isShowGoToPage,
  onChangeCount,
  onChangePage,
}) {
  const isVisible = numberOfPages > 1 && numberOfVisiblePages > 1;

  const [pageNumbers, setPageNumbers] = useState([]);
  const [isShowLeftDelimiter, setIsShowLeftDelimiter] = useState(false);
  const [isShowRightDelimiter, setIsShowRightDelimiter] = useState(false);

  useEffect(() => {
    let pages = [];
    let isVisibleLeftDelimiter = false;
    let isVisibleRightDelimiter = false;
    const half = Math.floor(numberOfVisiblePages / 2);

    if (page <= half) {
      isVisibleRightDelimiter = true;
      pages = [
        ...[...Array(numberOfVisiblePages - 1).keys()]
          .map((i) => i + 1),
        numberOfPages,
      ];
    } else if (page >= (numberOfPages - half)) {
      isVisibleLeftDelimiter = true;
      pages = [
        1,
        ...[...Array(numberOfVisiblePages - 1).keys()]
          .map((i) => i + 1)
          .map((i) => i + (numberOfPages - numberOfVisiblePages) + 1),
      ];
    } else {
      isVisibleLeftDelimiter = true;
      isVisibleRightDelimiter = true;
      pages = [
        1,
        ...[...Array(numberOfVisiblePages - 2).keys()]
          .map((i) => i + 1)
          .map((i) => i + (page - half)),
        numberOfPages,
      ];
    }

    setPageNumbers(pages);
    setIsShowLeftDelimiter(isVisibleLeftDelimiter);
    setIsShowRightDelimiter(isVisibleRightDelimiter);
  }, [page, numberOfPages, numberOfVisiblePages]);

  if (!isVisible) {
    return null;
  }

  const handleClickArrowButton = (e) => {
    const { direction } = e?.target?.dataset || {};
    if (!direction) {
      return;
    }

    let pageNumber = page;
    switch (direction) {
      case 'backward':
        pageNumber -= 1;
        break;
      case 'forward':
        pageNumber += 1;
        break;
      default:
        break;
    }

    onChangePage(pageNumber);
  };
  const handleClickPageNumberButton = (e) => {
    const { value: pageNumber } = e?.target || {};
    if (!pageNumber || pageNumber === String(page)) {
      return;
    }
    onChangePage(pageNumber);
  };

  console.log(count, countOptions, onChangeCount);
  return (
    <div className={styles.pagination}>
      <div className={styles.paginationList}>
        <button
          type="button"
          data-direction="backward"
          className={styles.paginationButton}
          disabled={isDisabled || page <= 1}
          onClick={handleClickArrowButton}
        >
          <IconChevronLeft />
        </button>
        {pageNumbers.map((num, index) => (
          <Fragment key={num}>
            {isShowLeftDelimiter && index === 1 && (
              <span>
                ...
              </span>
            )}
            <button
              type="button"
              value={num}
              data-selected={String(num === page)}
              className={styles.paginationButton}
              disabled={isDisabled}
              onClick={handleClickPageNumberButton}
            >
              {formatNumber(num)}
            </button>
            {isShowRightDelimiter && index === (numberOfVisiblePages - 2) && (
              <span>
                ...
              </span>
            )}
          </Fragment>
        ))}
        <button
          type="button"
          data-direction="forward"
          className={styles.paginationButton}
          disabled={isDisabled || page >= numberOfPages}
          onClick={handleClickArrowButton}
        >
          <IconChevronRight />
        </button>
      </div>
      {isShowGoToPage && (
        <div className={styles.paginationPage}>
          Перейти на страницу
        </div>
      )}
      {isShowCountOptions && (
        <div className={styles.paginationCount}>
          Записей на странице
        </div>
      )}
    </div>
  );
};

PagePagination.propTypes = propTypes;
PagePagination.defaultProps = defaultProps;

export default PagePagination;
