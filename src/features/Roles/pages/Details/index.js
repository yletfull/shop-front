import React, { useEffect } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useQueryParams, useService } from '@/hooks';
import Button from '@/components/Button';
import WithSpinner from '@/components/WithSpinner';
import service from '@/features/Roles/service';
import RolePermissions from '@/features/Roles/components/RolePermissions';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const Details = function Details() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { name: roleName } = useParams();

  const [params] = useQueryParams();

  const {
    fetch: fetchRole,
    data: role,
    isFetching: isFetchingRole,
  } = useService({
    initialData: { data: {}, meta: {} },
    service: service.fetchRole,
  });

  const {
    fetch: fetchRolePermissions,
    data: rolePermissions,
    isFetching: isFetchingRolePermissions,
  } = useService({
    initialData: { data: [], meta: {} },
    service: service.fetchRolePermissions,
  });

  const { data: permissions } = rolePermissions || {};
  const { title } = role?.data || {};

  useEffect(() => {
    const fetch = async () => {
      const requestParams = { params, name: roleName };
      await Promise.all([
        fetchRole(requestParams),
        fetchRolePermissions(requestParams),
      ]);
    };
    fetch();
  }, [fetchRole, fetchRolePermissions, roleName, params]);

  const getBaseUrl = () => {
    const index = url.indexOf('/details');
    return url.slice(0, index);
  };

  const handleClickBackButton = () => {
    history.push(getBaseUrl());
  };
  const handleClickEditButton = () => {
    history.push(`${getBaseUrl()}/edit/${roleName}`);
  };

  return (
    <div className={styles.roleDetails}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetchingRole || isFetchingRolePermissions}
      />

      <span className={styles.roleDetailsTitle}>
        {`Роль: ${title}`}
      </span>

      <RolePermissions
        data={permissions}
      />

      <div className={styles.roleDetailsRow}>
        <Button
          className={styles.roleDetailsButton}
          onClick={handleClickEditButton}
        >
          Редактировать
        </Button>
        <Button
          appearance="secondary"
          className={styles.roleDetailsButton}
          onClick={handleClickBackButton}
        >
          К списку
        </Button>
      </div>
    </div>
  );
};

Details.propTypes = propTypes;
Details.defaultProps = defaultProps;

export default Details;
