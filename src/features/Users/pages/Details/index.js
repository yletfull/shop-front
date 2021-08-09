import React, { useEffect } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useService } from '@/hooks';
import Button from '@/components/Button';
import WithSpinner from '@/components/WithSpinner';
import service from '@/features/Users/service';
import RolesList from '@/features/Users/components/RolesList';
import UserDetails from '@/features/Users/components/UserDetails';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const Details = function Details() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { id: userId } = useParams();

  const {
    data: user,
    fetch: fetchUser,
    isFetching: isFetchingUser,
  } = useService({
    initialData: {},
    service: service.fetchUser,
  });

  const {
    data: roles,
    fetch: fetchRoles,
    isFetching: isFetchingRoles,
  } = useService({
    initialData: [],
    service: service.fetchRolesList,
  });

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUser(userId);
    fetchRoles(userId);
  }, [fetchUser, fetchRoles, userId]);

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
        isFetching={isFetchingUser || isFetchingRoles}
      />

      <div className={styles.userDetailsSection}>
        <UserDetails
          data={user}
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
        <RolesList
          data={roles}
        />
      </div>
    </div>
  );
};

Details.propTypes = propTypes;
Details.defaultProps = defaultProps;

export default Details;
