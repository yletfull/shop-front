/* eslint-disable react/jsx-indent */
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import UserStore from '@/store/User';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '@/router/constants';
import { usersRoles } from '@/constants/usersRoles';
import styles from './styles.module.scss';

const NavBar = observer(() => {
  const history = useHistory();

  const logOut = () => {
    UserStore.setUser({});
    UserStore.setIsAuth(false);
  };

  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href={SHOP_ROUTE}>Shop</Navbar.Brand>
        <Nav className="me-auto">
          {UserStore.user.role === usersRoles.admin && (
            <Button
              variant={'control'}
              className={styles.headerLink}
              onClick={() => history.push(ADMIN_ROUTE)}
            >
               Админ-панель
            </Button>
          )}

          <Button
            variant={'control'}
            className={styles.headerLink}
            onClick={history.push(SHOP_ROUTE)}
          >
            Товары
          </Button>

        </Nav>

        <Nav className={styles.navigation}>
          <Navbar.Text className={styles.login}>
            {UserStore.user.login}
          </Navbar.Text>

          {UserStore.isAuth ?
            (<Button
              variant={'outline-dark'}
              onClick={() => logOut()}
              className="ml-4"
            >
              Выйти
            </Button>)
            : (<Button
              variant={'outline-dark'}
              onClick={() => history.push(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>)
          }
        </Nav>
      </Container>
    </Navbar>

  );
});

export default NavBar;
