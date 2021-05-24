
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '@/components/Spinner';
import { fetchAllRoles } from '@/store/users/actions';

const RolesTable = function UsersScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const rolesList = useSelector((state) => state.users.allRoles);
  const roles = useRef(rolesList);
  useLayoutEffect(() => {
    roles.current = rolesList;
  }, [rolesList]);

  useEffect(() => {
    const fetchUsersFn = async () => {
      setIsFetching(true);
      await dispatch(fetchAllRoles());
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
              Имя
            </td>
            <td>
              Наименование
            </td>
          </tr>
          {roles?.current?.length
            ? roles.current.map((role) => (
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
    </div>
  );
};

export default RolesTable;
