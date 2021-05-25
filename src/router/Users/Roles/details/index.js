/* eslint-disable react/no-array-index-key */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Spinner from '@/components/Spinner';
import { fetchRolesDetails } from '@/store/users/actions';
// import Tag from '@/components/Tag';
// import Button from '@/components/Button';
// import Select from '@/components/Select';
// import TimesCircleIcon from '@/icons/TimesCircle';
// import styles from './styles.module.scss';


const Details = function RolesDetailsScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const rolesDetailsData = useSelector((state) => state.users.rolesDetailsData);
  const rolesDetails = useRef(rolesDetailsData);
  useLayoutEffect(() => {
    rolesDetails.current = rolesDetailsData;
  }, [rolesDetailsData]);

  const allRolesData = useSelector((state) => state.users.allRoles);
  const allRoles = useRef(allRolesData);
  useLayoutEffect(() => {
    allRoles.current = allRolesData;
  }, [allRolesData]);

  const { roleId } = useParams();
  useEffect(() => {
    const fetchRolesDetailsFn = async () => {
      setIsFetching(true);
      await dispatch(fetchRolesDetails({ roleId }));
      setIsFetching(false);
    };
    fetchRolesDetailsFn();
  }, [dispatch, roleId]);


  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div>
      <p>
        Разрешения
      </p>
      <table>
        <tbody>
          <tr header="">
            <td>
              Имя
            </td>
            <td>
              Права
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Details;
