
import React from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import routes, { patchs } from './routes';
import styles from './styles.module.scss';


const Users = function UsersScreen() {
  return (
    <div>
      <div className={styles.navItemsWrapper}>
        <NavLink
          to={`${patchs.usersList}`}
          className="link-class_nav"
          activeClassName="active-link-class_nav"
        >
          Список пользователей
        </NavLink>
        <NavLink
          to={`${patchs.roles}`}
          className="link-class_nav"
          activeClassName="active-link-class_nav"
        >
          Роли
        </NavLink>
      </div>

      <Switch>
        {routes.map(({ exact, path, title, Component }) => (
          <Route
            key={`h_${path}`}
            path={path}
            exact={Boolean(exact)}
          >
            <Component title={title} />
          </Route>
        ))}
        <Redirect to={routes[0].path} />
      </Switch>
    </div>
  );
};

export default Users;
