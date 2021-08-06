import React, { useEffect } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useService } from '@/hooks';
import Button from '@/components/Button';
import WithSpinner from '@/components/WithSpinner';
import service from '@/features/Users/service';
import UserDetails from '@/features/Users/components/UserDetails';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const Details = function Details() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { id: userId } = useParams();

  const { fetch, data, isFetching } = useService({
    initialData: {},
    service: service.fetchUser,
  });

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetch(userId);
  }, [fetch, userId]);

  const getBaseUrl = () => {
    const index = url.indexOf('/details');
    return url.slice(0, index);
  };

  const handleClickBackButton = () => {
    history.push(getBaseUrl());
  };
  const handleClickEditButton = () => {
    history.push(`${getBaseUrl()}/edit/${userId}`);
  };

  return (
    <div className={styles.userDetails}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetching}
      />

      <div className={styles.userDetailsSection}>
        <UserDetails
          data={data}
        />

        <div className={styles.userDetailsRow}>
          <Button
            className={styles.userDetailsButton}
            onClick={handleClickEditButton}
          >
            Редактировать
          </Button>
          <Button
            appearance="secondary"
            className={styles.userDetailsButton}
            onClick={handleClickBackButton}
          >
            К списку
          </Button>
        </div>
      </div>
      <div className={styles.userDetailsSection}>
        Roles
      </div>
    </div>
  );
};

Details.propTypes = propTypes;
Details.defaultProps = defaultProps;

export default Details;
