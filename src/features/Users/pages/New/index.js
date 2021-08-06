import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useService } from '@/hooks';
import CreateUserForm from '@/features/Users/components/CreateUserForm';
import service from '@/features/Users/service';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const New = function New() {
  const { url } = useRouteMatch();
  const history = useHistory();

  const {
    fetch: createUser,
    isFetching: isSubmitting,
  } = useService({ service: service.createUser });

  const handleCancelUserForm = () => {
    const index = url.lastIndexOf('/');
    history.push(url.slice(0, index));
  };
  const handleSubmitUserForm = (values) => {
    if (!values.login) {
      return;
    }
    createUser(values);
  };

  return (
    <div className={styles.usersNew}>
      <div className={styles.userNewSection}>
        <CreateUserForm
          isDisabled={isSubmitting}
          onCancel={handleCancelUserForm}
          onSubmit={handleSubmitUserForm}
        />
      </div>
      <div className={styles.userNewSection}>
        &nbsp;
      </div>
    </div>
  );
};

New.propTypes = propTypes;
New.defaultProps = defaultProps;

export default New;
