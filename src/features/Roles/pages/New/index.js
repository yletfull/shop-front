import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useQueryParams, useService } from '@/hooks';
import WithSpinner from '@/components/WithSpinner';
import service from '@/features/Roles/service';
import CreateRoleForm from '@/features/Roles/components/CreateRoleForm';
import AddPermissionsForm from '@/features/Roles/components/AddPermissionsForm';
import EditPermissions from '@/features/Roles/components/EditPermissions';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const New = function New() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [params] = useQueryParams();

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const {
    fetch: createRole,
    data: createRoleResponse,
    isFetching: isSubmittingRole,
  } = useService({ service: service.createRole });

  const {
    fetch: fetchPermissions,
    data: permissions,
    isFetching: isFetchingPermissions,
  } = useService({
    initialData: { data: [], meta: {} },
    service: service.fetchPermissions,
  });

  const openRolesList = useCallback(() => {
    const index = url.indexOf('/new');
    history.push(url.slice(0, index) || '/');
  }, [history, url]);

  useEffect(() => {
    fetchPermissions(params);
  }, [fetchPermissions, params]);

  useEffect(() => {
    const { status } = createRoleResponse || {};
    if (!status || status !== 201) {
      return;
    }
    openRolesList();
  }, [createRoleResponse, openRolesList]);

  const { data: permissionsDictionary } = permissions || {};

  const handleCancelCreateRole = () => {
    openRolesList();
  };
  const handleRemovePermission = (value) => {
    setSelectedPermissions(selectedPermissions
      .filter(({ name }) => name !== value));
  };
  const handleSubmitCreateRole = (values) => {
    const { name: roleName, title: roleTitle } = values || {};
    if (!roleName) {
      return;
    }
    createRole({
      roleName,
      roleTitle,
      abilities: selectedPermissions.map(({ name }) => name),
    });
  };
  const handleSelectedPermissions = (values) => {
    if (!values || !Array.isArray(values)) {
      return;
    }
    setSelectedPermissions([...selectedPermissions, ...values]);
  };

  return (
    <div className={styles.roleNew}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetchingPermissions}
      />

      <div className={styles.roleNewColumn}>
        <CreateRoleForm
          isDisabled={isSubmittingRole}
          onCancel={handleCancelCreateRole}
          onSubmit={handleSubmitCreateRole}
        >
          <EditPermissions
            data={selectedPermissions}
            onRemove={handleRemovePermission}
          />
        </CreateRoleForm>
      </div>
      <div className={styles.roleNewColumn}>
        <AddPermissionsForm
          data={permissionsDictionary}
          selected={selectedPermissions}
          onSubmit={handleSelectedPermissions}
        />
      </div>
    </div>
  );
};

New.propTypes = propTypes;
New.defaultProps = defaultProps;

export default New;