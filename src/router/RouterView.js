import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppLayout from '@/components/AppLayout';
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
              <AppLayout headerTitle="Вконтакт">
                <Component {...props} />
              </AppLayout>
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
