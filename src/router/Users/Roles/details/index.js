/* eslint-disable react/no-array-index-key */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Spinner from '@/components/Spinner';
import { fetchRolesDetails, fetchRolesAbilities, editRole } from '@/store/users/actions';
import Button from '@/components/Button';
import TimesCircleIcon from '@/icons/TimesCircle';
import EditRolePopup from './Components/EditRole';
import styles from './styles.module.scss';


const Details = function RolesDetailsScreen() {
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);
  const [
    editAbilitiesPopupIsOpen, setEditAbilitiesPopupIsOpen,
  ] = useState(false);
  const [
    removeAbilityButtonDisabled, setRemoveAbilityButtonDisabled,
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

  const handleEditRolePopupOpen = () => {
    setEditAbilitiesPopupIsOpen(true);
  };
  const handleEditRolePopupClose = () => {
    setEditAbilitiesPopupIsOpen(false);
  };
  const handleRemoveAbilityButtonClick = async (e) => {
    const { abilityName } = e.target.dataset;
    const abilities = rolesAbilities.current
      .filter((ability) => ability.name !== abilityName)
      .map((ability) => ability.name);
    const roleTitle = rolesDetails.current.title;
    setRemoveAbilityButtonDisabled(abilityName);
    await dispatch(editRole({ roleName, roleTitle, abilities }));
    await dispatch(fetchRolesAbilities({ roleName }));
    setRemoveAbilityButtonDisabled(false);
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div>
      <div className={styles.headerWrapper}>
        <p>
          {`Разрешения для роли "${rolesDetails.current.title.trim()}"`}
        </p>
        <Button
          className={styles.editAbilitiesButton}
          appearance="control"
          onClick={handleEditRolePopupOpen}
        >
          <span>
            Изменить роль
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
                <td className={styles.removeAbilityButtonTd}>
                  <Button
                    appearance="control"
                    className={styles.removeAbilityButton}
                    onClick={handleRemoveAbilityButtonClick}
                    data-ability-name={ability.name}
                    disabled={removeAbilityButtonDisabled === ability.name}
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
      && <EditRolePopup onClose={handleEditRolePopupClose} />}

    </div>
  );
};

export default Details;
