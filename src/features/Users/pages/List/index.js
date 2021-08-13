import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQueryParams, useService } from '@/hooks';
import Controls, { ControlsLink } from '@/components/Controls';
import Pagination from '@/components/Pagination';
import WithSpinner from '@/components/WithSpinner';
import IconPlus from '@/icons/Plus';
import service from '@/features/Users/service';
import TableView from '@/features/Users/components/TableView';
import styles from './styles.module.scss';

const countOptions = [10, 20, 30];

const propTypes = {};
const defaultProps = {};

const UsersList = function UsersList() {
  const { url } = useRouteMatch();
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
    if (!value || value < 0) {
      return;
    }
    setParams({ ...params, currentPage: value });
  };
  const handleCountSelect = (value) => {
    if (!value || value < 0) {
      return;
    }
    setParams({ ...params, perPage: value });
  };

  return (
    <div className={styles.usersList}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetching}
      />

      <Controls className={styles.usersListControls}>
        <ControlsLink
          icon={(<IconPlus />)}
          to={`${url}/new`}
        >
          Добавить
          <br />
          пользователя
        </ControlsLink>
      </Controls>

      <TableView
        data={tableData}
      />
      <Pagination
        currentPage={pagination?.currentPage || 1}
        pagesTotal={pagination?.totalPages || 1}
        count={pagination?.perPage || countOptions[0]}
        countOptions={countOptions}
        onPageSelect={handleChangePage}
        onCountSelect={handleCountSelect}
      />
    </div>
  );
};

UsersList.propTypes = propTypes;
UsersList.defaultProps = defaultProps;

export default UsersList;
