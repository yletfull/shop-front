import React, { useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Popup from '@/components/Popup';
import { createUser, fetchUsers } from '@/store/users/actions';
import styles from './styles.module.scss';


const propTypes = {
  onClose: PropTypes.func.isRequired,
};

const EditRolePopup = function EditRolePopup(props) {
  const { onClose } = props;

  const dispatch = useDispatch();

  const [submitButtonDisabled, setSubmitButtomDisabed] = useState();
  const [login, setLogin] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const createUserErrorData = useSelector(
    (state) => state.users.createUserError
  );
  const createUserError = useRef(createUserErrorData);
  useLayoutEffect(() => {
    createUserError.current = createUserErrorData;
  }, [createUserErrorData]);


  const handleLoginInputChange = (e) => {
    const { value } = e.target;
    setLogin(value);
  };
  const handleEmailInputChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };
  const handlePhoneInputChange = (e) => {
    const { value } = e.target;
    setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitButtomDisabed(true);
    await dispatch(createUser(
      {
        login,
        email,
        phone,
      }
    ));
    setSubmitButtomDisabed(false);
    if (!createUserError.current) {
      await dispatch(fetchUsers());
      onClose();
    }
  };

  return (
    <Popup
      onClose={onClose}
      title="Создать пользователя"
    >

      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr content="">
              <td>
                Логин:
              </td>
              <td>
                <Input
                  value={login}
                  onChange={handleLoginInputChange}
                  className={styles.select}
                  placeholder="Введите логин"
                />
              </td>
            </tr>
            <tr content="">
              <td>
                e-mail:
              </td>
              <td>
                <Input
                  value={email}
                  onChange={handleEmailInputChange}
                  className={styles.select}
                  placeholder="Введите e-mail"
                />
              </td>
            </tr>
            <tr content="">
              <td>
                Телефон
              </td>
              <td>
                <Input
                  value={phone}
                  onChange={handlePhoneInputChange}
                  className={styles.select}
                  placeholder="Введите номер телефона"
                />
              </td>
            </tr>
            <tr>
              <td>
                <Button
                  disabled={submitButtonDisabled
                        || !phone || !login || !email}
                  type="submit"
                >
                  Cоздать пользователя
                </Button>
              </td>
              <td>
                {(createUserError.current)
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

    </Popup>
  );
};

EditRolePopup.propTypes = propTypes;

export default EditRolePopup;
