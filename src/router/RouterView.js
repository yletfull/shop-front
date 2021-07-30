import React, { Fragment, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Spinner from '@/components/Spinner';
import NotFound from './NotFound';
import routes from './routes';

const RouterView = function RouterView() {
  return (
    <Suspense fallback={(<Spinner />)}>
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
                <Component
                  defaultTitle={title}
                  {...props}
                />
              </Fragment>
            )}
          </Route>
        ))}
        <Route
          key="__any-route"
          path="*"
        >
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default RouterView;
