/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink, useHistory } from 'react-router-dom';
import UserStore from '@/store/User';
import { ADMIN_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from '@/router/constants';
import { usersRolesIds } from '@/constants/usersRoles';
import cx from 'classnames';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Button from '@/components/Button';
import styles from './styles.module.scss';
import { paperProps } from './constants';

const NavBar = observer(() => {
  const history = useHistory();

  const logOut = () => {
    UserStore.setUser({});
    UserStore.setIsAuth(false);
  };

  const isAdmin = UserStore.user.roleId === usersRolesIds.admin;

  const [anchorEl, setAnchorEl] = useState(null);

  const menuIsOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box className={styles.navBar}>
        {isAdmin && (
          <NavLink
            to={ADMIN_ROUTE}
            className={styles.navBarLink}
            activeClassName={styles.navBarLinkActive}
          >
            Админ-панель
          </NavLink>
        )}

        <NavLink
          to={SHOP_ROUTE}
          className={cx(styles.navBarLink)}
        >
          Товары
        </NavLink>

        <NavLink
          to={SHOP_ROUTE}
          className={cx(styles.navBarLink)}
        >
          Отзывы
        </NavLink>

        <Tooltip title="Настройки профиля">
          <Button
            onClick={handleClick}
            className={styles.navBarButton}
          >
            Профиль

            <Avatar className={styles.navBarAvatar}>
              {UserStore?.user?.login?.substring(0, 1) || 'u'}
            </Avatar>
          </Button>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={menuIsOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={paperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        {!UserStore?.isAuth && (
          <MenuItem onClick={() => history.push(LOGIN_ROUTE)}>
            <Avatar />

            Зарегистрироваться / Войти
          </MenuItem>
        )}

        {UserStore?.isAuth && (
          <MenuItem>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>

            Мой профиль
          </MenuItem>
        )}

        {UserStore?.isAuth && (
          <MenuItem onClick={logOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>

            Выйти
          </MenuItem>
        )}

      </Menu>
    </React.Fragment>

  );
});

export default NavBar;
