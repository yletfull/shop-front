import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryParams, useService } from '@/hooks';
import WithSpinner from '@/components/WithSpinner';
import service from '@/features/Roles/service';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const Details = function Details() {
  const { name: roleName } = useParams();

  const [params] = useQueryParams();

  const {
    fetch: fetchRolePermissions,
    data: rolePermissions,
    isFetching: isFetchingRolePermissions,
  } = useService({
    initialData: { data: [], meta: {} },
    service: service.fetchRole,
  });

  useEffect(() => {
    fetchRolePermissions({
      params,
      name: roleName,
    });
  }, [fetchRolePermissions, roleName, params]);

  console.log(rolePermissions);

  return (
    <div className={styles.wrapper}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetchingRolePermissions}
      />
    </div>
  );
};

Details.propTypes = propTypes;
Details.defaultProps = defaultProps;

export default Details;
