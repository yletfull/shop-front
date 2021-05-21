
import React from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import routes, { patchs } from './routes';


const Users = function UsersScreen() {
  return (
    <div>
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
