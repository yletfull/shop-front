import React, { Fragment, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Spinner from '@/components/Spinner';
import routes from './routes';

const propTypes = {
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
};

const RouterView = function RouterView({
  dateStart,
  dateEnd,
}) {
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
                  dateStart={dateStart}
                  dateEnd={dateEnd}
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

RouterView.propTypes = propTypes;

export default RouterView;
