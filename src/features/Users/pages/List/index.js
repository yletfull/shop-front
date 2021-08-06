import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQueryParams, useService } from '@/hooks';
import Controls, { ControlsLink } from '@/components/Controls';
import PagePagination from '@/components/PagePagination';
import WithSpinner from '@/components/WithSpinner';
import IconPlus from '@/icons/Plus';
import service from '@/features/Users/service';
import TableView from '@/features/Users/components/TableView';
import styles from './styles.module.scss';

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
    setParams({ ...params, currentPage: value || 1 });
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
