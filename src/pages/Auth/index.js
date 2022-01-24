import React, { useState } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '@/router/constants';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import UserStore from '@/store/User';
import { useFormik } from 'formik';
import { login, registration } from './service';

const Auth = observer(() => {
  const user = UserStore;
  const location = useLocation();
  const history = useHistory();

  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const isLogin = location.pathname === LOGIN_ROUTE;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsFetching(true);
      try {
        let newUser = user;

        if (isLogin) {
          newUser = await login(values);
        } else {
          newUser = await registration(values);
        }

        user.setUser(newUser);
        user.setIsAuth(true);
        setError(false);

        history.push(SHOP_ROUTE);
      } catch (err) {
        setError(err);
      }
      setIsFetching(false);
    },
  });

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">
          {isLogin ? 'Авторизация' : 'Регистрация'}
        </h2>

        <ErrorMessageBlock
          error={error}
        />

        <Spinner
          isFetching={isFetching}
        />

        <Form
          className="d-flex flex-column"
          onSubmit={formik.handleSubmit}
        >
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш email..."
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            disabled={isFetching}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль..."
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            disabled={isFetching}
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ?
              <div>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
              </div>
              :
              <div>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </div>
            }
            <Button
              variant="outline-dark"
              size="lg"
              className="mt-3"
              type="submit"
              disabled={isFetching}
            >
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </Row>

        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
