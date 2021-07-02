import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { useParams } from 'react-router';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import Popup from '@/components/Popup';
import { fetchAllRoleAbilities, fetchRolesDetails, fetchRolesAbilities } from '@/store/users/actions';
import { getAllRoleAbilities, getRolesAbilities, getRolesDetails } from '@/store/users/selectors';
import service from '@/store/users/service';
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
  const [submittingError, setSubmittingError] = useState(null);

  const rolesAbilities = useSelector(getRolesAbilities);

  const allRoleAbilities = useSelector(getAllRoleAbilities);

  const rolesDetails = useSelector(getRolesDetails);
  const [roleTitle, setRoleTitle] = useState(rolesDetails.title);

  useEffect(() => {
    const fetchAllAbilitiesFn = async () => {
      setIsFetching(true);
      await dispatch(fetchAllRoleAbilities());
      setIsFetching(false);
    };
    fetchAllAbilitiesFn();
  }, [dispatch]);

  const { roleName } = useParams();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let abilities = [];
    abilities = selectedAbilities;
    if (rolesAbilities.length) {
      abilities = [
        ...abilities, ...rolesAbilities.map((el) => el.name),
      ];
    }
    setSubmitButtomDisabed(true);
    try {
      await service.editRole(
        { roleName: roleName.trim(), roleTitle, abilities }
      );
      await dispatch(fetchRolesDetails({ roleName }));
      await dispatch(fetchRolesAbilities({ roleName }));
      onClose();
    } catch (error) {
      console.error(error);
      setSubmittingError(error?.responce?.data || 'Ошибка');
    }
    setSubmitButtomDisabed(false);
  };

  return (
    <Popup
      onClose={onClose}
      title="Изменить роль"
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
                    Изменить имя:
                  </td>
                  <td>
                    <Input
                      value={roleTitle}
                      onChange={handleNameInputChange}
                      className={styles.select}
                      disabled={!allRoleAbilities.length}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button
                      disabled={submitButtonDisabled}
                      type="submit"
                    >
                      Сохранить
                    </Button>
                  </td>
                  <td>
                    {submittingError
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
