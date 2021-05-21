
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/Spinner';
import { fetchUsers } from '@/store/users/actions';

const Users = function UsersScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const usersData = useSelector((state) => state.users);
  const users = useRef(usersData);
  useLayoutEffect(() => {
    users.current = usersData;
  }, [usersData]);

  console.log(users.current);

  useEffect(() => async () => {
    console.log('da');
    setIsFetching(true);
    await dispatch(fetchUsers());
    setIsFetching(false);
  }, [dispatch]);

  useEffect(() => async () => {
    console.log('da');
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
                  {user.id}
                </td>
                <td>
                  {user.login}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.phone}
                </td>
                <td>
                  {user.createdAt}
                </td>
                <td>
                  {user.upldateAt}
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

export default Users;
