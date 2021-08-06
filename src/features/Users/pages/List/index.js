import React, { useEffect } from 'react';
import { useQueryParams, useService } from '@/hooks';
import PagePagination from '@/components/PagePagination';
import WithSpinner from '@/components/WithSpinner';
import service from '@/features/Users/service';
import TableView from '@/features/Users/components/TableView';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const UsersList = function UsersList() {
  const [params, setParams] = useQueryParams();

  const { fetch, data, isFetching } = useService({
    initialData: { data: [], meta: {} },
    service: service.fetchUsersList,
  });

  const { data: tableData, meta: tableMeta } = data || {};
  const { pagination } = tableMeta || {};

  useEffect(() => {
    fetch(params);
  }, [fetch, params]);

  const handleChangePage = (value) => {
    setParams({ ...params, currentPage: value || 1 });
  };

  return (
    <div className={styles.usersList}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetching}
      />
      <TableView
        data={tableData}
      />
      <PagePagination
        page={pagination?.currentPage || 1}
        numberOfPages={pagination?.totalPages || 1}
        numberOfVisiblePages={5}
        isDisabled={isFetching}
        onChangePage={handleChangePage}
      />
    </div>
  );
};

UsersList.propTypes = propTypes;
UsersList.defaultProps = defaultProps;

export default UsersList;
