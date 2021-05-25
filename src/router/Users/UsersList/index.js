
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';


const Users = function UsersScreen() {
  return (
    <div>
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
