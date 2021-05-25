import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Auth from '@/router/Auth';
import routes from './routes';

const RouterView = function RouterView() {
  return (
    <Switch>
      {routes.map(({ exact, path, title, Component }) => (
        <Route
          key={`h_${path}`}
          path={path}
          exact={Boolean(exact)}
        >
          {(props) => (
            <Fragment>
              <Helmet defaultTitle="Вконтакт">
                {title && (
                  <title>
                    {title}
                  </title>
                )}
              </Helmet>
              <Auth
                Component={Component}
                props={props}
              />
            </Fragment>
          )}
        </Route>
      ))}
      <Route
        key="__any-route"
        path="*"
      >
        <Redirect to={routes[0].path} />
      </Route>
    </Switch>

  );
};

export default RouterView;
