
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/format';
import Spinner from '@/components/Spinner';
import { fetchUsers } from '@/store/users/actions';
import Button from '@/components/Button';
import { getUsersList } from '@/store/users/selectors';
import styles from './styles.module.scss';
import AddUserPopup from './AddUserPopup';

const userTable = function UsersScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);
  const [addUserPopupIsOpen, setAddUserPopupIsOpen] = useState(false);

  const users = useSelector(getUsersList);

  useEffect(() => {
    const fetchUsersFn = async () => {
      setIsFetching(true);
      await dispatch(fetchUsers());
      setIsFetching(false);
    };
    fetchUsersFn();
  }, [dispatch]);

  const handleAddUserOpenPopup = () => {
    setAddUserPopupIsOpen(true);
  };
  const handleAddUserClosePopup = () => {
    setAddUserPopupIsOpen(false);
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
          onClick={handleAddUserOpenPopup}
        >
          <span>
            Добавить пользователя
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
              Логин
            </td>
            <td>
              e-mail
            </td>
            <td>
              Телефон
            </td>
            <td>
              Дата создания
            </td>
            <td>
              Дата обновления
            </td>
          </tr>
          {users?.length
            ? users.map((user) => (
              <tr
                key={user.id}
                content=""
              >
                <td>
                  <Link to={(location) => ({ location, pathname: `/users/list/${user.id}/details` })}>
                    {user.id || '-'}
                  </Link>
                </td>
                <td>
                  {user.login || '-'}
                </td>
                <td>
                  {user.email || '-'}
                </td>
                <td>
                  {user.phone || '-'}
                </td>
                <td>
                  {formatDate(user.createdAt, 'YYYY:MM:DD HH:mm:ss')}
                </td>
                <td>
                  {formatDate(user.uploadAt, 'YYYY:MM:DD HH:mm:ss')}
                </td>
              </tr>
            ))
            : (
              <tr content="">
                <td colSpan="8">
                  Пользователи не найдены
                </td>
              </tr>
            )}
        </tbody>
      </table>

      {addUserPopupIsOpen
        && <AddUserPopup onClose={handleAddUserClosePopup} />}

    </div>
  );
};

export default userTable;
