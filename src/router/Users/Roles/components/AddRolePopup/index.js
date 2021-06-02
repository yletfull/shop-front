import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import Popup from '@/components/Popup';
import { fetchAllRoleAbilities, createRole, fetchAllRoles } from '@/store/users/actions';
import styles from './styles.module.scss';


const propTypes = {
  onClose: PropTypes.func.isRequired,
};

const EditRolePopup = function EditRolePopup(props) {
  const { onClose } = props;

  const dispatch = useDispatch();

  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [submitButtonDisabled, setSubmitButtomDisabed] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const allRoleAbilities = useSelector(
    (state) => state.users.allRoleAbilities
  );

  const [roleTitle, setRoleTitle] = useState('');
  const [roleName, setRoleName] = useState('');

  const createRoleErrorData = useSelector(
    (state) => state.users.createRoleError
  );
  const createRoleError = useRef(createRoleErrorData);
  useLayoutEffect(() => {
    createRoleError.current = createRoleErrorData;
  }, [createRoleErrorData]);

  useEffect(() => {
    const fetchAllAbilitiesFn = async () => {
      setIsFetching(true);
      await dispatch(fetchAllRoleAbilities());
      setIsFetching(false);
    };
    fetchAllAbilitiesFn();
  }, [dispatch]);

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
    setRoleName(value);
  };
  const handleTitleInputChange = (e) => {
    const { value } = e.target;
    setRoleTitle(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitButtomDisabed(true);
    await dispatch(createRole(
      {
        roleName: roleName.trim(),
        roleTitle: roleTitle.trim(),
        abilities: selectedAbilities,
      }
    ));
    setSubmitButtomDisabed(false);
    if (!createRoleError.current) {
      await dispatch(fetchAllRoles());
      onClose();
    }
  };

  return (
    <Popup
      onClose={onClose}
      title="Создать роль"
    >
      {isFetching
        ? <Spinner />
        : (
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr content="">
                  <td className={styles.editRoleAddAbilitiesTextWrapper}>
                    Добавить разрешения:
                  </td>
                  <td>
                    <div
                      className={styles.editRoleCheckboxWrapper}
                    >
                      {allRoleAbilities.map((ability) => (
                        <label
                          key={ability.id}
                          htmlFor={ability.id}
                          className={styles.editRoleCheckboxLabel}
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
                    </div>
                  </td>
                </tr>
                <tr content="">
                  <td>
                    Добавить наименование
                  </td>
                  <td>
                    <Input
                      value={roleName}
                      onChange={handleNameInputChange}
                      className={styles.select}
                      placeholder="Например, admin"
                    />
                  </td>
                </tr>
                <tr content="">
                  <td>
                    Добавить имя:
                  </td>
                  <td>
                    <Input
                      value={roleTitle}
                      onChange={handleTitleInputChange}
                      className={styles.select}
                      placeholder="Например, администратор"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button
                      disabled={submitButtonDisabled || !roleTitle || !roleName}
                      type="submit"
                    >
                      Сохранить
                    </Button>
                  </td>
                  <td>
                    {(createRoleError.current)
                      && (
                        <p className={cx('red', styles.editRoleError)}>
                          Произошла ошибка
                        </p>
                      )}
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        )}
    </Popup>
  );
};

EditRolePopup.propTypes = propTypes;

export default EditRolePopup;
