import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { useParams } from 'react-router';
import Button from '@/components/Button';
import Select from '@/components/Select';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import Popup from '@/components/Popup';
import { fetchAllRoleAbilities, editRole, fetchRolesAbilities } from '@/store/users/actions';
import styles from './styles.module.scss';


const propTypes = {
  onClose: PropTypes.func.isRequired,
};

const EditRolePopup = function EditRolePopup(props) {
  const { onClose } = props;

  const dispatch = useDispatch();

  const [selectedAbility, setSelectedAbility] = useState();
  const [submitButtonDisabled, setSubmitButtomDisabed] = useState();
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
  const [roleTitle, setRoleTitle] = useState(rolesDetails.current.title);


  useEffect(() => {
    const fetchAllAbilitiesFn = async () => {
      setIsFetching(true);
      await dispatch(fetchAllRoleAbilities());
      setIsFetching(false);
    };
    fetchAllAbilitiesFn();
  }, [dispatch]);

  const { roleName } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const abilities = [];
    abilities.push(selectedAbility);
    if (rolesAbilities.current.length) {
      abilities.push(...rolesAbilities.current.map((el) => el.name));
    }
    setSubmitButtomDisabed(true);
    await dispatch(editRole({ roleName, roleTitle, abilities }));
    setSubmitButtomDisabed(false);
    await dispatch(fetchRolesAbilities({ roleName }));
    onClose();
  };

  const handleAbilityChange = (e) => {
    const { value } = e.target;
    setSelectedAbility(value);
  };

  const handleNameInputChange = (e) => {
    const { value } = e.target;
    setRoleTitle(value);
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
            <table>
              <tbody>
                <tr>
                  
                </tr>
              </tbody>
            </table>
            <form
              className={styles.addAbilityForm}
              onSubmit={handleSubmit}
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

              <Input
                value={roleTitle}
                onChange={handleNameInputChange}
                className={styles.select}
                disabled={!allRoleAbilities.current?.length}
              />
              <Button
                type="submit"
                disabled={submitButtonDisabled}
                className={styles.addAbilityButton}
              >
                Сохранить
              </Button>

              {(allRoleAbilitiesError.current) && (
                <p className={cx('red', styles.addAbilityError)}>
                  Произошла ошибка
                </p>
              )}

            </form>
          </div>

        )}
    </Popup>
  );
};

EditRolePopup.propTypes = propTypes;

export default EditRolePopup;
