import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSignIn } from '@/store/auth/actions';
import Input from '@/components/Input';
import Button from '@/components/Button';
import styles from './styles.module.scss';

const Login = function LoginScreen() {
  const dispatch = useDispatch();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const error = useSelector((state) => state.auth.error);

  const handleLoginInput = (e) => {
    const { value } = e.target;

    setLogin(value);
  };

  const handlePasswordInput = (e) => {
    const { value } = e.target;

    setPassword(value);
  };

  const handleRememberMeSelect = (e) => {
    const { checked } = e.target;

    setRememberMe(checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authSignIn({ login, password, rememberMe }));
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
      <p className={styles.error}>
        {error}
      </p>
      <label
        className={styles.checkboxWrapper}
        htmlFor="rememberMe"
      >
        <Input
          checked={rememberMe}
          onChange={handleRememberMeSelect}
          type="checkbox"
          id="rememberMe"
          className={styles.checkbox}
        />
        Запомнить меня
      </label>
      <Button type="submit">
        Вход
      </Button>
    </form>
  );
};

export default Login;
