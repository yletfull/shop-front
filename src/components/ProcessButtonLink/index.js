/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const propTypes = {
  icon: PropTypes.node,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.any),
  ]),
  className: PropTypes.string,
};

const defaultProps = {
  icon: null,
  text: 'Имя кнопки',
  className: '',
};

const ProcessButton = function ProcessButton(props) {
  const { icon, text, className, ...attrs } = props;

  return (
    <Link
      type="button"
      className={styles.processButtonLink}
      {...attrs}
    >
      <span className={styles.icon}>
        {icon || 'Иконка'}
      </span>
      <span className={cx(styles.label, className)}>
        {Array.isArray(text)
          ? text.map((el, i) => (
            <div key={i}>
              {el}
            </div>
          ))
          : (
            <span>
              {text || 'Текст'}
            </span>
          )}
      </span>
    </Link>
  );
};

ProcessButton.propTypes = propTypes;
ProcessButton.defaultProps = defaultProps;

export default ProcessButton;
