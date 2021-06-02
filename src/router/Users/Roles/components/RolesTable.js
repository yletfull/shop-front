
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import Button from '@/components/Button';
import { fetchAllRoles } from '@/store/users/actions';
import { getAllRoles } from '@/store/users/selectors';
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

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div>
      <div className={styles.headerWrapper}>
        <p>
          Список ролей
        </p>
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

      <table>
        <tbody>
          <tr header="">
            <td>
              Идентификатор
            </td>
            <td>
              Имя
            </td>
            <td>
              Наименование
            </td>
          </tr>
          {roles?.length
            ? roles.map((role) => (
              <tr
                key={role.id}
                content=""
              >
                <td>
                  <Link to={(location) => ({ location, pathname: `/users/roles/${role.name}/details` })}>
                    {role.id || '-'}
                  </Link>
                </td>
                <td>
                  {role.name || '-'}
                </td>
                <td>
                  {role.title || '-'}
                </td>
              </tr>
            ))
            : (
              <tr content="">
                <td colSpan="8">
                  Роли не найдены
                </td>
              </tr>
            )}
        </tbody>
      </table>

      {addRolePopupIsOpen
        && <AddRolePopup onClose={handleAddRoleClosePopup} />}

    </div>
  );
};

export default RolesTable;
