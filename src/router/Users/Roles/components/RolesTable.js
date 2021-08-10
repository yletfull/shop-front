
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import { fetchAllRoles } from '@/store/users/actions';
import { getAllRoles } from '@/store/users/selectors';
import Table, { TableRow, TableCell } from '@/components/Table';
import WithSpinner from '@/components/WithSpinner';
import AddRolePopup from './AddRolePopup';
import styles from './styles.module.scss';

const RolesTable = function UsersScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);
  const [addRolePopupIsOpen, setAddRolePopupIsOpen] = useState(false);

  const roles = useSelector(getAllRoles);

  useEffect(() => {
    const fetchUsersFn = async () => {
      setIsFetching(true);
      await dispatch(fetchAllRoles());
      setIsFetching(false);
    };
    fetchUsersFn();
  }, [dispatch]);

  const handleAddRoleOpenPopup = () => {
    setAddRolePopupIsOpen(true);
  };
  const handleAddRoleClosePopup = () => {
    setAddRolePopupIsOpen(false);
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <Button
          className={styles.editAbilitiesButton}
          appearance="control"
          onClick={handleAddRoleOpenPopup}
        >
          <span>
            Добавить роль
          </span>
        </Button>
      </div>

      <div className={styles.wrapper}>
        <WithSpinner
          className={styles.spinnerOverlay}
          layout="overlay"
          isFetching={isFetching}
        />
        <Table>
          <TableRow type="header">
            <TableCell>
              Идентификатор
            </TableCell>
            <TableCell>
              Имя
            </TableCell>
            <TableCell>
              Наименование
            </TableCell>
          </TableRow>
          {roles?.length
            ? roles.map((role) => (
              <TableRow
                key={role.id}
                content=""
              >
                <TableCell>
                  <Link to={(location) => ({ location, pathname: `/users/roles/${role.name}/details` })}>
                    {role.id || '-'}
                  </Link>
                </TableCell>
                <TableCell>
                  {role.name || '-'}
                </TableCell>
                <TableCell>
                  {role.title || '-'}
                </TableCell>
              </TableRow>
            ))
            : (
              <TableRow content="">
                <TableCell colSpan="8">
                  Роли не найдены
                </TableCell>
              </TableRow>
            )}
        </Table>
      </div>

      {addRolePopupIsOpen
        && <AddRolePopup onClose={handleAddRoleClosePopup} />}

    </div>
  );
};

export default RolesTable;
