import React, { Fragment, Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import {
  getAbilitiesBySection,
  getHasUnlimitedAccess,
} from '@/store/auth/selectors';
import Spinner from '@/components/Spinner';
import NotFound from './NotFound';
import routes from './routes';

const RouterView = function RouterView() {
  const abilities = useSelector(getAbilitiesBySection);
  const hasUnlimitedAccess = useSelector(getHasUnlimitedAccess);

  const pages = routes.filter(({ rights }) => {
    if (hasUnlimitedAccess) {
      return true;
    }
    const { section } = rights || {};
    if (section && abilities[section]) {
      return true;
    }
    return false;
  });

  return (
    <Suspense fallback={(<Spinner />)}>
      <Switch>
        {pages[0]?.path && (
          <Route
            path="/"
            exact
          >
            <Redirect to={pages[0]?.path} />
          </Route>
        )}
        {pages.map(({ exact, path, title, Component }) => (
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
