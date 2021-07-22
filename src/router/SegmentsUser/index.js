import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setHeader } from '@/store/ui/actions';
import { links } from './constants';
import SearchForm from './SearchForm';
import UserAttributes from './UserAttributes';
import UserSegments from './UserSegments';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const SegmentsUser = function SegmentsUser({ defaultTitle }) {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  const user = '';

  const handleSearchFormSubmit = (userName) => {
    console.log('Search Form Submit', userName);
  };

  return (
    <div className={styles.segmentsUser}>
      <SearchForm
        user={user}
        onSubmit={handleSearchFormSubmit}
      />

      <div className={styles.segmentsUserTabs}>
        <NavLink
          activeClassName={styles.segmentsUserLink_active}
          className={styles.segmentsUserLink}
          to={`${url}/${links.attributes}`}
        >
          Атрибуты
        </NavLink>
        <NavLink
          activeClassName={styles.segmentsUserLink_active}
          className={styles.segmentsUserLink}
          to={`${url}/${links.segments}`}
        >
          Сегменты
        </NavLink>
      </div>

      <Switch>
        <Route
          path={path}
          exact
        >
          <Redirect to={`${url}/${links.attributes}`} />
        </Route>
        <Route path={`${url}/${links.attributes}`}>
          <UserAttributes />
        </Route>
        <Route path={`${url}/${links.segments}`}>
          <UserSegments />
        </Route>
      </Switch>
    </div>
  );
};

SegmentsUser.propTypes = propTypes;
SegmentsUser.defaultProps = defaultProps;

export default SegmentsUser;
