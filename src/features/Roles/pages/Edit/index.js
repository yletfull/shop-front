import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryParams, useService } from '@/hooks';
import WithSpinner from '@/components/WithSpinner';
import service from '@/features/Roles/service';
import AddPermissionsForm from '@/features/Roles/components/AddPermissionsForm';
import EditPermissionsForm from '@/features/Roles/components/EditPermissionsForm';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const Edit = function Edit() {
  const { name: roleName } = useParams();
  const [params] = useQueryParams();

  const {
    fetch: fetchEditPermissionsForm,
    data: rolePermissions,
    isFetching: isFetchingEditPermissionsForm,
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
        fetchEditPermissionsForm(requestParams),
      ]);
    };
    fetch();
  }, [fetchAllPermissions, fetchEditPermissionsForm, roleName, params]);

  useEffect(() => {
    setSelectedPermissions(permissions);
  }, [permissions]);

  const handleRemovePermission = (value) => {
    setSelectedPermissions(selectedPermissions
      .filter((d) => d.name !== value));
  };
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
        isFetching={isFetchingAllPermissions || isFetchingEditPermissionsForm}
      />

      <div className={styles.rolesEditColumn}>
        <EditPermissionsForm
          data={selectedPermissions}
          onRemove={handleRemovePermission}
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
