
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from './routes';


const Roles = function UsersScreen() {
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
        <Redirect to={routes[0].path} />
      </Switch>
    </div>
  );
};

export default Roles;
