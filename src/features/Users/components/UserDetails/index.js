import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '@/utils/format';
import styles from './styles.module.scss';

const propTypes = {
  data: PropTypes.shape({
    createdAt: PropTypes.string,
    email: PropTypes.string,
    login: PropTypes.string,
    phone: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
};

const defaultProps = {
  data: {},
};

const UserDetails = function UserDetails({ data }) {
  const dateFormat = 'YYYY:MM:DD HH:mm:ss';
  return (
    <div className={styles.userDetails}>
      <div className={styles.userDetailsRow}>
        <span className={styles.userDetailsLabel}>
          Логин:
        </span>
        <span className={styles.userDetailsValue}>
          {data.login}
        </span>
      </div>
      <div className={styles.userDetailsRow}>
        <span className={styles.userDetailsLabel}>
          Телефон:
        </span>
        <span className={styles.userDetailsValue}>
          {data.phone || '-'}
        </span>
      </div>
      <div className={styles.userDetailsRow}>
        <span className={styles.userDetailsLabel}>
          E-mail:
        </span>
        <span className={styles.userDetailsValue}>
          {data.email}
        </span>
      </div>
      <div className={styles.userDetailsRow}>
        <span className={styles.userDetailsLabel}>
          Создан:
        </span>
        <span className={styles.userDetailsValue}>
          {data.createdAt ? formatDate(data.createdAt, dateFormat) : '-'}
        </span>
      </div>
      <div className={styles.userDetailsRow}>
        <span className={styles.userDetailsLabel}>
          Обновлен:
        </span>
        <span className={styles.userDetailsValue}>
          {data.updatedAt ? formatDate(data.updatedAt, dateFormat) : '-'}
        </span>
      </div>
    </div>
  );
};

UserDetails.propTypes = propTypes;
UserDetails.defaultProps = defaultProps;

export default UserDetails;
