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
import * as Yup from 'yup';
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
      passwordRepeat: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Некорректный e-mail').required('Обязательное поле'),
      password: Yup.string()
        .min(2, 'от 2 до 50 символов')
        .max(50, 'от 2 до 50 символов')
        .required('Обязательное поле'),
      passwordRepeat: !isLogin && Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Повторите пароль'),
      login: !isLogin && Yup.string()
        .min(3, 'от 3 до 12 символов')
        .max(12, 'от 3 до 12 символов')
        .required('Обязательное поле'),
    }),
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
      <Card style={{ width: 400 }} className="p-5">
        <h2 className="m-left">
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
          noValidate
        >
          <Form.Group>
            <Form.Control
              className="mt-3"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              disabled={isFetching}
              isInvalid={formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {!isLogin && (
            <Form.Group>
              <Form.Control
                className="mt-3"
                placeholder="Логин"
                name="login"
                onChange={formik.handleChange}
                value={formik.values.login}
                disabled={isFetching}
                isInvalid={formik.errors.login}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.login}
              </Form.Control.Feedback>
            </Form.Group>)}

          <Form.Group>
            <Form.Control
              className="mt-3"
              placeholder="Пароль"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              disabled={isFetching}
              isInvalid={formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {!isLogin && (
            <Form.Group>
              <Form.Control
                className="mt-3"
                placeholder="Повторите пароль"
                name="passwordRepeat"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.passwordRepeat}
                disabled={isFetching}
                isInvalid={formik.errors.passwordRepeat}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.passwordRepeat}
              </Form.Control.Feedback>
            </Form.Group>)}

          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ?
              <div>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
              </div>
              :
              <div>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
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
