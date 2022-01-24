import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import UserStore from '@/store/User/index';
import { authRoutes, publicRoutes } from './routes';

const AppRouter = observer(() => {
  const user = UserStore;

  return (
    <Switch>
      {user.isAuth && authRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} component={Component} exact />
      )}

      {publicRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} component={Component} exact />
      )}

      <Redirect to={'/'} />
    </Switch>
  );
});

export default AppRouter;
