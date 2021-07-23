import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import { useQuery } from '@/hooks';
import { formatNumber } from '@/utils/format';
import {
  queryParams,
  links,
  namespace as NS,
} from './constants';
import {
  fetchAttributes,
  fetchSegments,
} from './actions';
import reducer from './reducer';
import {
  getSegmentsCount,
} from './selectors';
import Attributes from './Attributes';
import SearchForm from './SearchForm';
import Segments from './Segments';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const SegmentsUser = function SegmentsUser({ defaultTitle }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const { search } = useLocation();
  const { path, url } = useRouteMatch();

  const segmentsCount = useSelector(getSegmentsCount);

  const [entity, setEntity] = useState(query.get(queryParams.user) || '');
  const [params, setParams] = useState({
    currentPage: query.get(queryParams.page) || 1,
  });

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  useEffect(() => {
    if (!entity) {
      return;
    }
    dispatch(fetchAttributes(entity));
  }, [dispatch, entity]);

  useEffect(() => {
    if (!entity) {
      return;
    }
    dispatch(fetchSegments(entity, params));
  }, [dispatch, entity, params]);

  const handleChangeSegmentsPage = (page) => {
    if (!page) {
      return;
    }
    setParams({ ...params, currentPage: page });
  };
  const handleSearchFormSubmit = (values) => {
    const { user } = values || {};
    setEntity(user);
    query.set(queryParams.user, user);
    history.push({ search: query.toString() });
  };

  return (
    <div className={styles.segmentsUser}>
      <SearchForm
        user={entity || ''}
        onSubmit={handleSearchFormSubmit}
      />

      <div className={styles.segmentsUserTabs}>
        <NavLink
          activeClassName={styles.segmentsUserLink_active}
          className={styles.segmentsUserLink}
          to={`${url}/${links.attributes}${search}`}
        >
          Атрибуты
        </NavLink>
        <NavLink
          activeClassName={styles.segmentsUserLink_active}
          className={styles.segmentsUserLink}
          to={`${url}/${links.segments}${search}`}
        >
          Сегменты
          &nbsp;
          {segmentsCount && (
            <span className={styles.segmentsUserLinkCount}>
              {formatNumber(segmentsCount)}
            </span>
          )}
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
          <Attributes />
        </Route>
        <Route path={`${url}/${links.segments}`}>
          <Segments
            onChangePage={handleChangeSegmentsPage}
          />
        </Route>
      </Switch>
    </div>
  );
};

SegmentsUser.propTypes = propTypes;
SegmentsUser.defaultProps = defaultProps;

export default SegmentsUser;
