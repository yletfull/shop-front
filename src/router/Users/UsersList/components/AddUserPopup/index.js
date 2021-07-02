import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import service from '@/store/users/service';
import { fetchUsers } from '@/store/users/actions';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Popup from '@/components/Popup';
import styles from './styles.module.scss';

const propTypes = {
  onClose: PropTypes.func,
};

const defaultProps = {
  onClose: () => {},
};

const EditRolePopup = function EditRolePopup({ onClose }) {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

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

    const params = { login, email, phone };
    setIsSubmittingForm(true);
    try {
      await service.createUser(params);
      dispatch(fetchUsers());
      onClose();
    } catch (error) {
      console.error(error);
      setSubmittingError(error?.response?.data || 'Error');
    }
    setIsSubmittingForm(false);
  };

  const isSubmitButtonDisabled = isSubmittingForm
    || !login
    || !email
    || !phone;

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
                  type="submit"
                  disabled={isSubmitButtonDisabled}
                >
                  Cоздать пользователя
                </Button>
              </td>
              <td>
                {submittingError && (
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
EditRolePopup.defaultProps = defaultProps;

export default EditRolePopup;
