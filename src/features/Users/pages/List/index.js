import React, { useEffect } from 'react';
import { useQueryParams, useService } from '@/hooks';
import WithSpinner from '@/components/WithSpinner';
import service from '@/features/Users/service';
import TableView from '@/features/Users/components/TableView';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const UsersList = function UsersList() {
  const [params] = useQueryParams();

  const { fetch, data, isFetching } = useService({
    initialData: { data: [], meta: {} },
    service: service.fetchUsersList,
  });

  const { data: tableData, meta: tableMeta } = data || {};

  useEffect(() => {
    fetch(params);
  }, [fetch, params]);

  console.log(tableMeta);

  return (
    <div className={styles.usersList}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetching}
      />
      <TableView data={tableData} />
    </div>
  );
};

UsersList.propTypes = propTypes;
UsersList.defaultProps = defaultProps;

export default UsersList;
