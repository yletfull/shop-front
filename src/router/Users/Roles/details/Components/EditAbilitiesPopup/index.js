import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { useParams } from 'react-router';
import Button from '@/components/Button';
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

  const [selectedAbilities, setSelectedAbilities] = useState([]);
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
    abilities.push(...selectedAbilities);
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
    const { name } = e.target.dataset;
    const { checked = false } = e.target;
    if (checked) {
      setSelectedAbilities((prev) => [...prev, name]);
      return;
    }
    setSelectedAbilities((prev) => prev
      .filter((n) => n !== name));
  };

  const handleNameInputChange = (e) => {
    const { value } = e.target;
    setRoleTitle(value);
  };

  return (
    <Popup
      onClose={onClose}
      title="Добавить разрешение"
    >
      {isFetching
        ? <Spinner />
        : (
          <table>
            <tbody>
              <tr content="">
                <td>
                  Добавить разрешения
                </td>
                <td>
                  <form
                    className={styles.editRoleCheckboxWrapper}
                  >
                    {allRoleAbilities.current.map((ability) => (
                      <label
                        key={ability.id}
                        htmlFor={ability.id}
                      >
                        <input
                          type="checkbox"
                          id={ability.id}
                          value={ability.name}
                          onChange={handleAbilityChange}
                          data-name={ability.name}
                        />
                        {ability.title}
                      </label>
                    ))}
                  </form>
                </td>
              </tr>
              <tr content="">
                <td>
                  Изменить имя
                </td>
                <td>
                  <Input
                    value={roleTitle}
                    onChange={handleNameInputChange}
                    className={styles.select}
                    disabled={!allRoleAbilities.current?.length}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    disabled={submitButtonDisabled}
                    className={styles.editRoleButton}
                    onClick={handleSubmit}
                  >
                    Сохранить
                  </Button>
                </td>
                <td>
                  {(allRoleAbilitiesError.current) && (
                    <p className={cx('red', styles.editRoleError)}>
                      Произошла ошибка
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )}
    </Popup>
  );
};

EditRolePopup.propTypes = propTypes;

export default EditRolePopup;
