
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { authSignIn, setTest } from '../../store/auth/actions';
import styles from './styles.module.scss';

const Upload = function UploadScreen() {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const test = useSelector((state) => state.auth.test);

  const handleLoginInput = (e) => {
    const { value } = e.target;

    setLogin(value);
  };
  const handlePasswordInput = (e) => {
    const { value } = e.target;

    setPassword(value);
  };
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    dispatch(setTest(login));
    dispatch(authSignIn({ login, password }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
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
      <p>
        {test}
      </p>
      <Button type="submit">
        Вход
      </Button>
    </form>
  );
};

export default Upload;
