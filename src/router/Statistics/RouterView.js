import React, { Fragment, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Spinner from '@/components/Spinner';
import routes from './routes';

const RouterView = function RouterView() {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {routes.map(({ exact, path, title, Component }) => (
          <Route
            key={`h_${path}`}
            path={path}
            exact={Boolean(exact)}
          >
            {(props) => (
              <Fragment>
                <Helmet defaultTitle="Статистика">
                  {title && (
                    <title>
                      {`Статистика. ${title}`}
                    </title>
                  )}
                </Helmet>
                <Component
                  {...props}
                />
              </Fragment>
            )}
          </Route>
        ))}
        <Redirect to={routes[0].path} />
      </Switch>
    </Suspense>
  );
};

export default RouterView;
