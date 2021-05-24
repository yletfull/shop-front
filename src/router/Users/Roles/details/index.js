
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/Spinner';
import { fetchRoles } from '@/store/users/actions';

const Details = function RolesDetailsScreen() {
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
          <tr>
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
        </tbody>
      </table>
    </div>
  );
};

export default Details;
