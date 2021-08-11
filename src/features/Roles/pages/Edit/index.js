import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryParams, useService } from '@/hooks';
import WithSpinner from '@/components/WithSpinner';
import service from '@/features/Roles/service';
import AddPermissionsForm from '@/features/Roles/components/AddPermissionsForm';
import RolePermissions from '@/features/Roles/components/RolePermissions';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const Edit = function Edit() {
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

  const {
    fetch: fetchAllPermissions,
    data: allPermissions,
    isFetching: isFetchingAllPermissions,
  } = useService({
    initialData: { data: [], meta: {} },
    service: service.fetchPermissions,
  });

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const { data: availablePermissions } = allPermissions || {};
  const { data: permissions } = rolePermissions || {};

  useEffect(() => {
    const fetch = async () => {
      const requestParams = { params, name: roleName };
      await Promise.all([
        fetchAllPermissions(requestParams),
        fetchRolePermissions(requestParams),
      ]);
    };
    fetch();
  }, [fetchAllPermissions, fetchRolePermissions, roleName, params]);

  useEffect(() => {
    setSelectedPermissions(permissions);
  }, [permissions]);

  const handleSubmitAddPermissionsForm = (values) => {
    if (!values || !Array.isArray(values)) {
      return;
    }
    setSelectedPermissions([...selectedPermissions, ...values]);
  };

  return (
    <div className={styles.rolesEdit}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetchingAllPermissions || isFetchingRolePermissions}
      />

      <div className={styles.rolesEditColumn}>
        <RolePermissions
          data={selectedPermissions}
        />
      </div>
      <div className={styles.rolesEditColumn}>
        <AddPermissionsForm
          data={availablePermissions}
          selected={selectedPermissions}
          onSubmit={handleSubmitAddPermissionsForm}
        />
      </div>
    </div>
  );
};

Edit.propTypes = propTypes;
Edit.defaultProps = defaultProps;

export default Edit;
