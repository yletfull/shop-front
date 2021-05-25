/* eslint-disable react/no-array-index-key */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Spinner from '@/components/Spinner';
import { fetchRolesDetails, fetchRolesAbilities } from '@/store/users/actions';
import Button from '@/components/Button';
import TimesCircleIcon from '@/icons/TimesCircle';
import EditAbilitiesPopup from './EditAbilitiesPopup';
import styles from './styles.module.scss';


const Details = function RolesDetailsScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);
  const [
    editAbilitiesPopupIsOpen, setEditAbilitiesPopupIsOpen,
  ] = useState(false);

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

  const handleEditAbilitiesPopupOpen = () => {
    setEditAbilitiesPopupIsOpen(true);
  };
  const handleEditAbilitiesPopupClose = () => {
    setEditAbilitiesPopupIsOpen(false);
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div>
      <div className={styles.headerWrapper}>
        <p>
          {`Разрешения для роли "${rolesDetails.current.title}"`}
        </p>
        <Button
          className={styles.editAbilitiesButton}
          appearance="control"
          onClick={handleEditAbilitiesPopupOpen}
        >
          <span>
            добавить разрешение
          </span>
        </Button>
      </div>
      <table>
        <tbody>
          <tr header="">
            <td>
              Имя
            </td>
            <td colSpan="2">
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
                <td>
                  <Button
                    appearance="control"
                    className={styles.removeAbilityButton}
                    // onClick={handleRemoveAbilityButtonClick}
                    data-ability={ability.name}
                    // disabled={removeAbilityButtonDisabled}
                  >
                    <TimesCircleIcon />
                  </Button>
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

      {editAbilitiesPopupIsOpen
      && <EditAbilitiesPopup onClose={handleEditAbilitiesPopupClose} />}

    </div>
  );
};

export default Details;
