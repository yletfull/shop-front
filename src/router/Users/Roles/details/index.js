/* eslint-disable react/no-array-index-key */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Spinner from '@/components/Spinner';
import { fetchRolesDetails, fetchRolesAbilities } from '@/store/users/actions';

// import Tag from '@/components/Tag';
// import Button from '@/components/Button';
// import Select from '@/components/Select';
// import TimesCircleIcon from '@/icons/TimesCircle';
// import styles from './styles.module.scss';


const Details = function RolesDetailsScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const rolesDetailsData = useSelector((state) => state.users.rolesDetails);
  const rolesDetails = useRef(rolesDetailsData);
  useLayoutEffect(() => {
    rolesDetails.current = rolesDetailsData;
  }, [rolesDetailsData]);

  const rolesAbilitiesData = useSelector((state) => state.users.rolesAbilities);
  const rolesAbilities = useRef(rolesAbilitiesData);
  useLayoutEffect(() => {
    rolesAbilities.current = rolesAbilitiesData;
  }, [rolesAbilitiesData]);

  const { roleName } = useParams();
  useEffect(() => {
    const fetchRolesDetailsFn = async () => {
      setIsFetching(true);
      await dispatch(fetchRolesDetails({ roleName }));
      await dispatch(fetchRolesAbilities({ roleName }));
      setIsFetching(false);
    };
    fetchRolesDetailsFn();
  }, [dispatch, roleName]);

  if (isFetching) {
    return <Spinner />;
  }

  console.log(rolesDetails.current);

  return (
    <div>
      <p>
        {`Разрешения для роли "${rolesDetails.current.title}"`}
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

          {rolesAbilities.current?.length
            ? rolesAbilities.current.map((ability) => (
              <tr
                key={ability.id}
                content=""
              >
                <td>
                  {ability.name}
                </td>
                <td>
                  {ability.title}
                </td>
              </tr>
            ))
            : (
              <tr>
                <td>
                  Нет данных
                </td>
              </tr>
            )}

        </tbody>
      </table>
    </div>
  );
};

export default Details;
