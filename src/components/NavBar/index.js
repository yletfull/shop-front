import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import UserStore from '@/store/User';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '@/router/constants';

const NavBar = observer(() => {
  const user = UserStore;
  const history = useHistory();

  const goAdmin = () => history.push(ADMIN_ROUTE);
  const goAuth = () => history.push(LOGIN_ROUTE);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar
      bg="light"
    >
      <Container fluid>
        <Navbar.Brand href={SHOP_ROUTE}>Shop</Navbar.Brand>

        {user.isAuth ?
          <Nav
            className="ml-auto"
            style={{ color: 'gray' }}
          >
            <Button
              variant={'outline-dark'}
              onClick={goAdmin}
            >
              Админ-панель
            </Button>
            <Button
              variant={'outline-dark'}
              onClick={() => logOut()}
              className="ml-4"
            >
              Выйти
            </Button>
          </Nav>
          :
          <Nav className="ml-auto" style={{ color: 'white' }}>
            <Button
              variant={'outline-dark'}
              onClick={goAuth}
            >
                Авторизация
            </Button>
          </Nav>
        }
      </Container>
    </Navbar>

  );
});

export default NavBar;
