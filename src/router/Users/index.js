import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { setHeader } from '@/store/ui/actions';
import routes, { patchs } from './routes';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const Users = function UsersScreen({ defaultTitle }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  return (
    <div>
      <div className={styles.navItemsWrapper}>
        <NavLink
          to={`${patchs.usersList}`}
          className="link-class_nav"
          activeClassName="active-link-class_nav"
        >
          Список пользователей
        </NavLink>
        <NavLink
          to={`${patchs.roles}`}
          className="link-class_nav"
          activeClassName="active-link-class_nav"
        >
          Роли
        </NavLink>
      </div>

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

Users.propTypes = propTypes;
Users.defaultProps = defaultProps;

export default Users;
