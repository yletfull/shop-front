import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { useParams } from 'react-router';
import Button from '@/components/Button';
import Select from '@/components/Select';
import Spinner from '@/components/Spinner';
import Popup from '@/components/Popup';
import { fetchAllRoleAbilities, editRole, fetchRolesAbilities } from '@/store/users/actions';
import styles from './styles.module.scss';


const propTypes = {
  onClose: PropTypes.func.isRequired,
};

const EditAbilitiesPopup = function EditAbilitiesPopup(props) {
  const { onClose } = props;

  const dispatch = useDispatch();

  const [selectedAbility, setSelectedAbility] = useState();
  const [addAbilityButtonDisabled, setAddAbilityButtonDisabled] = useState();
  const [isFetching, setIsFetching] = useState();

  const rolesAbilitiesData = useSelector((state) => state.users.rolesAbilities);
  const rolesAbilities = useRef(rolesAbilitiesData);
  useLayoutEffect(() => {
    rolesAbilities.current = rolesAbilitiesData;
  }, [rolesAbilitiesData]);


  const allRoleAbilitiesData = useSelector(
    (state) => state.users.allRoleAbilities
  );
  const allRoleAbilities = useRef(allRoleAbilitiesData);
  useLayoutEffect(() => {
    allRoleAbilities.current = allRoleAbilitiesData;
  }, [allRoleAbilitiesData]);


  const allRoleAbilitiesErrorData = useSelector(
    (state) => state.users.allRoleAbilitiesError
  );
  const allRoleAbilitiesError = useRef(allRoleAbilitiesErrorData);
  useLayoutEffect(() => {
    allRoleAbilitiesError.current = allRoleAbilitiesErrorData;
  }, [allRoleAbilitiesErrorData]);


  const rolesDetailsData = useSelector((state) => state.users.rolesDetails);
  const rolesDetails = useRef(rolesDetailsData);
  useLayoutEffect(() => {
    rolesDetails.current = rolesDetailsData;
  }, [rolesDetailsData]);


  useEffect(() => {
    const fetchAllAbilitiesFn = async () => {
      setIsFetching(true);
      await dispatch(fetchAllRoleAbilities());
      setIsFetching(false);
    };
    fetchAllAbilitiesFn();
  }, [dispatch]);

  const { roleName } = useParams();

  const handleSubmitAbility = async (e) => {
    e.preventDefault();
    const abilities = [];
    const roleTitle = rolesDetails.current.title;
    abilities.push(selectedAbility);
    if (rolesAbilities.current.length) {
      abilities.push(...rolesAbilities.current.map((el) => el.name));
    }
    setAddAbilityButtonDisabled(true);
    await dispatch(editRole({ roleName, roleTitle, abilities }));
    setAddAbilityButtonDisabled(false);
    await dispatch(fetchRolesAbilities({ roleName }));
    onClose();
  };

  const handleAbilityChange = (e) => {
    const { value } = e.target;
    setSelectedAbility(value);
  };

  const getAllAbilitiesOptions = () => {
    if (allRoleAbilities.current?.length) {
      return allRoleAbilities.current.map((ability) => ({
        text: ability.title,
        value: ability.name,
      }));
    }
    return [];
  };

  return (
    <Popup
      onClose={onClose}
      title="Добавить разрешение"
    >
      {isFetching
        ? <Spinner />
        : (
          <div>
            <form
              className={styles.addAbilityForm}
              onSubmit={handleSubmitAbility}
            >
              <Select
                value={selectedAbility}
                options={getAllAbilitiesOptions(
                  allRoleAbilities.current
                )}
                onChange={handleAbilityChange}
                resetText="Не выбрано"
                placeholder="Разрешение"
                className={styles.select}
                disabled={!allRoleAbilities.current?.length}
              />
              <Button
                type="submit"
                disabled={addAbilityButtonDisabled
                  || !allRoleAbilities.current?.length}
                className={styles.addAbilityButton}
              >
                Добавить разрешение
              </Button>

              {(allRoleAbilitiesError.current) && (
                <p className={cx('red', styles.addAbilityError)}>
                  Произошла ошибка
                </p>
              )}

              {(!allRoleAbilities.current?.length) && (
                <p className={cx('red', styles.addAbilityError)}>
                  Нет доступных разрешений
                </p>
              )}
            </form>
          </div>

        )}
    </Popup>
  );
};

EditAbilitiesPopup.propTypes = propTypes;

export default EditAbilitiesPopup;
