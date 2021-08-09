import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { useService } from '@/hooks';
import WithSpinner from '@/components/WithSpinner';
import EditUserForm from '@/features/Users/components/EditUserForm';
import service from '@/features/Users/service';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const Edit = function Edit() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { id: userId } = useParams();

  const { fetch, data: user, isFetching } = useService({
    initialData: {},
    service: service.fetchUser,
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
    fetch(userId);
  }, [fetch, userId]);

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
        isFetching={isFetching}
      />

      <div className={styles.userEditSection}>
        <EditUserForm
          data={user}
          isDisabled={isFetching || isSubmitting || isSubmittingRemove}
          onCancel={openUsersList}
          onRemove={handleRemoveUserForm}
          onSubmit={handleSubmitUserForm}
        />
      </div>
      <div className={styles.userEditSection}>
        Roles
      </div>
    </div>
  );
};

Edit.propTypes = propTypes;
Edit.defaultProps = defaultProps;

export default Edit;
