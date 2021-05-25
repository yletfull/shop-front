/* eslint-disable react/no-array-index-key */

import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import Select from '@/components/Select';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import Button from '@/components/Button';
import Select from '@/components/Select';
import Popup from '@/components/Popup';
import styles from './styles.module.scss';

const propTypes = {
  onClose: PropTypes.func.isRequired,
};

const EditAbilitiesPopup = function EditAbilitiesPopup(props) {
  const { onClose } = props;

  const rolesAbilitiesData = useSelector((state) => state.users.rolesAbilities);
  const rolesAbilities = useRef(rolesAbilitiesData);
  useLayoutEffect(() => {
    rolesAbilities.current = rolesAbilitiesData;
  }, [rolesAbilitiesData]);

  const addAbilityErrorData = useSelector(
    (state) => state.users.addAbilityError
  );
  const addAbilityError = useRef(addAbilityErrorData);
  useLayoutEffect(() => {
    addAbilityError.current = addAbilityErrorData;
  }, [addAbilityErrorData]);

  const [selectedAbility, setSelectedAbility] = useState();
  const [addAbilityButtonDisabled, setAddAbilityButtonDisabled] = useState();

  const handleSubmitAbility = async (e) => {
    e.preventDefault();
    const abilityArr = [];
    abilityArr.push(selectedAbility);
    if (rolesAbilities.current.length) {
      abilityArr.push(...rolesAbilities.current.map((el) => el.name));
    }
    setAddAbilityButtonDisabled(true);
    console.log(abilityArr);
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
    if (rolesAbilities.current?.length) {
      return rolesAbilities.current.map((ability) => ({
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
      <table>
        <tr content="">
          <td>
            Добавить разрешение
          </td>
          <td>
            <form
              className={styles.addRoleForm}
              onSubmit={handleSubmitAbility}
            >
              <Select
                value={selectedAbility}
                options={getAllAbilitiesOptions(rolesAbilities.current)}
                onChange={handleAbilityChange}
                resetText="Не выбрано"
                placeholder="Выбрать роль"
                className={styles.select}
                disabled={!rolesAbilities.current?.length}
              />
              <Button
                type="submit"
                className={styles.addAbilityButton}
                disabled={addAbilityButtonDisabled}
              >
                Добавить роль
              </Button>
              {addAbilityError.current && (
              <p className={cx('red', styles.addAbilityError)}>
                Произошла ошибка
              </p>
              )}
            </form>
          </td>
        </tr>
      </table>
    </Popup>
  );
};

EditAbilitiesPopup.propTypes = propTypes;

export default EditAbilitiesPopup;
