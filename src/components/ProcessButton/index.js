/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
  const { icon, text, className } = props;

  return (
    <button
      type="button"
      className={styles.button}
    >
      <span className={styles.icon}>
        <img
          src={icon}
          alt="Иконка"
        />
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
    </button>
  );
};

ProcessButton.propTypes = propTypes;
ProcessButton.defaultProps = defaultProps;

export default ProcessButton;
