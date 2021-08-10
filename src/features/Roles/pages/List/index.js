import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQueryParams, useService } from '@/hooks';
import Controls, { ControlsLink } from '@/components/Controls';
import WithSpinner from '@/components/WithSpinner';
import IconPlus from '@/icons/Plus';
import service from '@/features/Roles/service';
import TableView from '@/features/Roles/components/TableView';
import styles from './styles.module.scss';

const propTypes = {};
const defaultProps = {};

const RolesList = function RolesList() {
  const { url } = useRouteMatch();
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
    </div>
  );
};

RolesList.propTypes = propTypes;
RolesList.defaultProps = defaultProps;

export default RolesList;
