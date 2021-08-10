import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQueryParams, useService } from '@/hooks';
import Controls, { ControlsLink } from '@/components/Controls';
import PagePagination from '@/components/PagePagination';
import WithSpinner from '@/components/WithSpinner';
import IconPlus from '@/icons/Plus';
import service from '@/features/Roles/service';
import TableView from '@/features/Roles/components/TableView';
import styles from './styles.module.scss';

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
    setParams({ ...params, currentPage: value || 1 });
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
      <PagePagination
        page={pagination?.currentPage || 1}
        numberOfPages={pagination?.totalPages || 1}
        numberOfVisiblePages={5}
        isDisabled={isFetchingRolesList}
        onChangePage={handleChangePage}
      />
    </div>
  );
};

RolesList.propTypes = propTypes;
RolesList.defaultProps = defaultProps;

export default RolesList;
