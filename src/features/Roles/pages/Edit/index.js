import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useQueryParams, useService } from '@/hooks';
import WithSpinner from '@/components/WithSpinner';
import service from '@/features/Roles/service';
import AddPermissionsForm from '@/features/Roles/components/AddPermissionsForm';
import EditRoleForm from '@/features/Roles/components/EditRoleForm';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const Edit = function Edit() {
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

  const {
    fetch: fetchAllPermissions,
    data: allPermissions,
    isFetching: isFetchingAllPermissions,
  } = useService({
    initialData: { data: [], meta: {} },
    service: service.fetchPermissions,
  });

  const {
    fetch: removeRole,
    data: removeRoleResponse,
    isFetching: isRemovingRole,
  } = useService({ service: service.removeRole });

  const {
    fetch: updateRole,
    data: updateRoleResponse,
    isFetching: isSubmittingRole,
  } = useService({ service: service.updateRole });

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const { data: availablePermissions } = allPermissions || {};
  const { data: permissions } = rolePermissions || {};
  const { title: roleTitle } = role?.data || {};

  useEffect(() => {
    const fetch = async () => {
      const requestParams = { params, name: roleName };
      await Promise.all([
        fetchAllPermissions(),
        fetchRole(requestParams),
        fetchRolePermissions(requestParams),
      ]);
    };
    fetch();
  }, [fetchAllPermissions, fetchRole, fetchRolePermissions, roleName, params]);

  useEffect(() => {
    setSelectedPermissions(permissions);
  }, [permissions]);

  const openRolesList = useCallback(() => {
    const index = url.indexOf('/edit');
    history.push(url.slice(0, index) || '/');
  }, [history, url]);

  useEffect(() => {
    const { status } = removeRoleResponse || {};
    if (!status || status !== 204) {
      return;
    }
    openRolesList();
  }, [removeRoleResponse, openRolesList]);

  useEffect(() => {
    const { status } = updateRoleResponse || {};
    if (!status || status !== 200) {
      return;
    }
    openRolesList();
  }, [updateRoleResponse, openRolesList]);

  const handleCancelEditing = () => {
    openRolesList();
  };
  const handleDeleteRole = () => {
    removeRole(roleName);
  };
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
  const handleSubmitRole = (values) => {
    updateRole({
      name: roleName,
      title: values.title,
      permissions: values.permissions.map(({ name }) => name),
    });
  };

  return (
    <div className={styles.rolesEdit}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetchingAllPermissions
          || isFetchingRole
          || isFetchingRolePermissions}
      />

      <div className={styles.rolesEditColumn}>
        <EditRoleForm
          title={roleTitle}
          permissions={selectedPermissions}
          isDisabled={isSubmittingRole || isRemovingRole}
          onCancel={handleCancelEditing}
          onDelete={handleDeleteRole}
          onRemove={handleRemovePermission}
          onSubmit={handleSubmitRole}
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
