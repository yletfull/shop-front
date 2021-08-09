import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useService } from '@/hooks';
import WithSpinner from '@/components/WithSpinner';
import AddRoleForm from '@/features/Users/components/AddRoleForm';
import EditUserForm from '@/features/Users/components/EditUserForm';
import RolesList from '@/features/Users/components/RolesList';
import service from '@/features/Users/service';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const Edit = function Edit() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { id: userId } = useParams();

  const {
    fetch: fetchUser,
    data: user,
    isFetching: isFetchingUser,
  } = useService({
    initialData: {},
    service: service.fetchUser,
  });

  const {
    fetch: fetchRoles,
    data: roles,
    isFetching: isFetchingRoles,
  } = useService({
    initialData: [],
    service: service.fetchUserRolesList,
  });

  const {
    fetch: updateUser,
    isFetching: isSubmitting,
    data: updateUserResponse,
  } = useService({ service: service.updateUser });

  const {
    fetch: removeUser,
    isFetching: isSubmittingRemove,
    data: removeUserResponse,
  } = useService({ service: service.removeUser });

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUser(userId);
    fetchRoles(userId);
  }, [fetchUser, fetchRoles, userId]);

  const openUsersList = useCallback(() => {
    const index = url.indexOf('/edit');
    history.push(url.slice(0, index) || '/');
  }, [history, url]);

  useEffect(() => {
    const { status } = updateUserResponse || {};
    if (!status) {
      return;
    }
    if (status === 200) {
      openUsersList();
    }
  }, [updateUserResponse, openUsersList]);

  useEffect(() => {
    const { status } = removeUserResponse || {};
    if (!status) {
      return;
    }
    if (status === 204) {
      openUsersList();
    }
  }, [removeUserResponse, openUsersList]);

  const handleRemoveRole = (roleId) => {
    if (!roleId) {
      return;
    }
    console.log(roleId);
  };
  const handleRemoveUserForm = () => {
    if (!userId) {
      return;
    }
    removeUser(userId);
  };
  const handleSubmitUserForm = (data) => {
    updateUser({ data, id: userId });
  };

  return (
    <div className={styles.userEdit}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetchingUser || isFetchingRoles}
      />

      <div className={styles.userEditSection}>
        <EditUserForm
          data={user}
          isDisabled={isFetchingUser || isSubmitting || isSubmittingRemove}
          onCancel={openUsersList}
          onRemove={handleRemoveUserForm}
          onSubmit={handleSubmitUserForm}
        />
      </div>
      <div className={styles.userEditSection}>
        <RolesList
          data={roles}
          onRemove={handleRemoveRole}
          isEditable
        />
        <AddRoleForm
          data={roles}
        />
      </div>
    </div>
  );
};

Edit.propTypes = propTypes;
Edit.defaultProps = defaultProps;

export default Edit;
