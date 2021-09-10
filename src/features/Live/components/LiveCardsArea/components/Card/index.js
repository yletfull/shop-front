import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styles from './styles.module.scss';

const propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dateFormat: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node,
};
const defaultProps = {
  dateFormat: 'DD.MM.YYYY HH:mm',
  image: null,
  children: null,
};

const LiveCard = function LiveCard({
  title,
  date,
  dateFormat,
  image,
  children,
  ...props
}) {
  return (
    <button
      className={styles.wrapper}
      type="button"
      {...props}
    >
      <img
        className={styles.image}
        src={image}
        alt={title}
      />

      <div className={styles.title}>
        {title}
      </div>

      <div className={styles.date}>
        {dayjs(date).format(dateFormat)}
      </div>

      {children}
    </button>
  );
};

LiveCard.propTypes = propTypes;
LiveCard.defaultProps = defaultProps;

export default LiveCard;
