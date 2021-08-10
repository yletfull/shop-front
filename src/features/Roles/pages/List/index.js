import React, { useEffect } from 'react';
import { useQueryParams, useService } from '@/hooks';
import WithSpinner from '@/components/WithSpinner';
import service from '@/features/Roles/service';
import TableView from '@/features/Roles/components/TableView';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const RolesList = function RolesList() {
  const [params] = useQueryParams();

  const {
    fetch: fetchRolesList,
    data: rolesList,
    isFetching: isFetchingRolesList,
  } = useService({
    initialData: { data: [], meta: {} },
    service: service.fetchRolesList,
  });

  const { data: tableData } = rolesList || {};

  useEffect(() => {
    fetchRolesList(params);
  }, [fetchRolesList, params]);

  return (
    <div className={styles.rolesList}>
      <WithSpinner
        layout="overlay"
        isFetching={isFetchingRolesList}
      />
      <TableView
        data={tableData || []}
      />
    </div>
  );
};

RolesList.propTypes = propTypes;
RolesList.defaultProps = defaultProps;

export default RolesList;
