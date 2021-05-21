
import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import routes, { patchs } from './routes';


const Users = function UsersScreen() {
  return (
    <div>
      <NavLink
        to={`${patchs.usersList}`}
        base
        activeClassName="active-link-class"
      >
        Список пользователей
      </NavLink>
      <NavLink
        to={`${patchs.roles}`}
        activeClassName="active-link-class"
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
      </Switch>
    </div>
  );
};

export default Users;
