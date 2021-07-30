import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const propTypes = {
  input: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  highlightClassName: PropTypes.string,
  caseSensitive: PropTypes.bool,
};
const defaultProps = {
  highlightClassName: '',
  caseSensitive: false,
};

const HighlightSearch = function HighlightSearch({
  input,
  search,
  highlightClassName,
  caseSensitive,
}) {
  if (!input || !search) {
    return input;
  }

  const [searchTarget, searchString] = caseSensitive
    ? [input, search]
    : [input.toLowerCase(), search.toLowerCase()];
  const searchLength = searchString.length;
  const matchIndexes = [];

  let index = searchTarget.indexOf(searchString);

  while (index !== -1) {
    matchIndexes.push(index);

    index = searchTarget.indexOf(searchString, index + 1);
  }

  const matchIndexesLength = matchIndexes.length;

  if (matchIndexesLength === 0) {
    return [input];
  }

  const result = [];
  let start = 0;

  for (let i = 0; i < matchIndexesLength; i += 1) {
    const matched = matchIndexes[i];
    const end = matched + searchLength;

    result.push(
      input.substring(start, matched),
      <span className={cx(styles.highlight, highlightClassName)}>
        {input.substring(matched, end)}
      </span>,
    );

    start = end;
  }
  result.push(input.substring(start));

  return result;
};

HighlightSearch.propTypes = propTypes;
HighlightSearch.defaultProps = defaultProps;

export default HighlightSearch;
