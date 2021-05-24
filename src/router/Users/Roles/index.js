
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/Spinner';
import { fetchRoles } from '@/store/users/actions';

const Users = function UsersScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const rolesList = useSelector((state) => state.users.roles);
  const roles = useRef(rolesList);
  useLayoutEffect(() => {
    roles.current = rolesList;
  }, [rolesList]);

  useEffect(() => {
    const fetchUsersFn = async () => {
      setIsFetching(true);
      await dispatch(fetchRoles());
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
              Name
            </td>
            <td>
              Title
            </td>
          </tr>
          {roles?.current?.length
            ? roles.current.map((role) => (
              <tr
                key={role.id}
                content=""
              >
                <td>
                  {role.id || '-'}
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
    </div>
  );
};

export default Users;
