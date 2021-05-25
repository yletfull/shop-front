
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/format';
import Spinner from '@/components/Spinner';
import { fetchUsers } from '@/store/users/actions';

const userTable = function UsersScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const usersList = useSelector((state) => state.users.list);
  const users = useRef(usersList);
  useLayoutEffect(() => {
    users.current = usersList;
  }, [usersList]);

  useEffect(() => {
    const fetchUsersFn = async () => {
      setIsFetching(true);
      await dispatch(fetchUsers());
      setIsFetching(false);
    };
    fetchUsersFn();
  }, [dispatch]);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div>
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
          {users?.current?.length
            ? users.current.map((user) => (
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
    </div>
  );
};

export default userTable;
