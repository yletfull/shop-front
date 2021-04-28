
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { authSignIn } from '../../store/auth/actions';
import styles from './styles.module.scss';


const Upload = function UploadScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginInput = (e) => {
    const { value } = e.target;

    setLogin(value);
  };
  const handlePasswordInput = (e) => {
    const { value } = e.target;

    setPassword(value);
  };
  const handleLoginButtonClick = () => {
    dispatch(authSignIn({ login, password }));
  };

  console.log(user);

  return (
    <form className={styles.form}>
      <Input
        value={login}
        placeholder="Введите логин"
        onInput={handleLoginInput}
      />
      <Input
        value={password}
        placeholder="Введите пароль"
        type="password"
        onInput={handlePasswordInput}
      />
      <Button onClick={handleLoginButtonClick}>
        Вход
      </Button>
    </form>
  );
};

export default Upload;
