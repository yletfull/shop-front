import React, { useCallback, useEffect, useState } from 'react';
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

  const [currentRoles, setCurrentRoles] = useState([]);

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
    service: service.fetchRoles,
  });

  const {
    fetch: fetchUserRoles,
    data: userRoles,
    isFetching: isFetchingUserRoles,
  } = useService({
    initialData: [],
    service: service.fetchUserRolesList,
  });

  const {
    fetch: updateUser,
    isFetching: isSubmittingUser,
    data: updateUserResponse,
  } = useService({ service: service.updateUser });

  const {
    fetch: updateUserRoles,
    isFetcing: isSubmittingUserRoles,
    data: updateUserRolesResponse,
  } = useService({ service: service.updateUserRoles });

  const {
    fetch: removeUser,
    isFetching: isSubmittingRemove,
    data: removeUserResponse,
  } = useService({ service: service.removeUser });

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUser(userId);
    fetchUserRoles(userId);
  }, [fetchUser, fetchUserRoles, userId]);

  const openUsersList = useCallback(() => {
    const index = url.indexOf('/edit');
    history.push(url.slice(0, index) || '/');
  }, [history, url]);

  useEffect(() => {
    const { status: userResponseStatus } = updateUserResponse || {};
    const { status: userRolesResponseStatus } = updateUserRolesResponse || {};
    if (!userResponseStatus || !userRolesResponseStatus) {
      return;
    }
    if (userResponseStatus === 200 && userRolesResponseStatus === 204) {
      openUsersList();
    }
  }, [updateUserResponse, updateUserRolesResponse, openUsersList]);

  useEffect(() => {
    const { status } = removeUserResponse || {};
    if (!status) {
      return;
    }
    if (status === 204) {
      openUsersList();
    }
  }, [removeUserResponse, openUsersList]);

  useEffect(() => {
    setCurrentRoles(userRoles);
  }, [userRoles]);

  const handleRemoveRole = (roleId) => {
    if (!roleId) {
      return;
    }
    const index = currentRoles.findIndex(({ id }) => id === roleId);
    setCurrentRoles([
      ...currentRoles.slice(0, index),
      ...currentRoles.slice(index + 1),
    ]);
  };
  const handleRemoveUserForm = () => {
    if (!userId) {
      return;
    }
    removeUser(userId);
  };
  const handleSubmitAddRoleForm = (values) => {
    const { role } = values || {};
    if (!role) {
      return;
    }
    const roleDescription = roles.find(({ name }) => name === role);
    if (!roleDescription) {
      return;
    }
    setCurrentRoles([...currentRoles, roleDescription]);
  };
  const handleSubmitUserForm = (data) => {
    updateUser({ data, id: userId });
    updateUserRoles({
      id: userId,
      data: currentRoles.map(({ name }) => name),
    });
  };

  return (
    <div className={styles.userEdit}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetchingUser || isFetchingUserRoles}
      />

      <div className={styles.userEditSection}>
        <EditUserForm
          data={user}
          isDisabled={isFetchingUser
            || isSubmittingUser
            || isSubmittingUserRoles
            || isSubmittingRemove}
          onCancel={openUsersList}
          onRemove={handleRemoveUserForm}
          onSubmit={handleSubmitUserForm}
        />
      </div>
      <div className={styles.userEditSection}>
        <RolesList
          data={currentRoles}
          onRemove={handleRemoveRole}
          isEditable
        />
        <AddRoleForm
          roles={roles}
          selected={currentRoles}
          isDisabled={isFetchingRoles}
          onSubmit={handleSubmitAddRoleForm}
        />
      </div>
    </div>
  );
};

Edit.propTypes = propTypes;
Edit.defaultProps = defaultProps;

export default Edit;
