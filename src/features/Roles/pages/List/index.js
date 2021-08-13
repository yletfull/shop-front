import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQueryParams, useService } from '@/hooks';
import Controls, { ControlsLink } from '@/components/Controls';
import Pagination from '@/components/Pagination';
import WithSpinner from '@/components/WithSpinner';
import IconPlus from '@/icons/Plus';
import service from '@/features/Roles/service';
import TableView from '@/features/Roles/components/TableView';
import styles from './styles.module.scss';

const countOptions = [10, 20, 30];

const propTypes = {};
const defaultProps = {};

const RolesList = function RolesList() {
  const { url } = useRouteMatch();
  const [params, setParams] = useQueryParams();

  const {
    fetch: fetchRolesList,
    data: rolesList,
    isFetching: isFetchingRolesList,
  } = useService({
    initialData: { data: [], meta: {} },
    service: service.fetchRolesList,
  });

  const { data: tableData, meta: tableMeta } = rolesList || {};
  const { pagination } = tableMeta || {};

  useEffect(() => {
    fetchRolesList(params);
  }, [fetchRolesList, params]);

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
    <div className={styles.rolesList}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetchingRolesList}
      />

      <Controls className={styles.rolesListControls}>
        <ControlsLink
          icon={(<IconPlus />)}
          to={`${url}/new`}
        >
          Добавить
          <br />
          роль
        </ControlsLink>
      </Controls>

      <TableView
        data={tableData || []}
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

RolesList.propTypes = propTypes;
RolesList.defaultProps = defaultProps;

export default RolesList;
