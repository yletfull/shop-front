import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import Button from '@/components/Button';
import Select from '@/components/Select';
import Spinner from '@/components/Spinner';
import Popup from '@/components/Popup';
import { fetchAllRoleAbilities } from '@/store/users/actions';
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

  const allRoleAbilitiesData = useSelector(
    (state) => state.users.allRolesAbilities
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

  useEffect(() => {
    const fetchAllAbilitiesFn = async () => {
      setIsFetching(true);
      await dispatch(fetchAllRoleAbilities());
      setIsFetching(false);
    };
    fetchAllAbilitiesFn();
  }, [dispatch]);


  const handleSubmitAbility = async (e) => {
    e.preventDefault();
    const abilityArr = [];
    abilityArr.push(selectedAbility);
    if (allRoleAbilities.current.length) {
      abilityArr.push(...allRoleAbilities.current.map((el) => el.name));
    }
    setAddAbilityButtonDisabled(true);
    // await dispatch(setUserRoles({ userId, ...roles }));
    // await dispatch(fetchUserDetails({ userId }));
    // await dispatch(fetchUserRoles({ userId }));
    setAddAbilityButtonDisabled(false);
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
      title="Изменить разрешения"
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
                placeholder="Выбрать роль"
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
