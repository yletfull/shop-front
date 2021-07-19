import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import { namespace as NS } from './constants';
import {
  fetchEntities,
} from './actions';
import reducer from './reducer';
import EntitySelect from './EntitySelect';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const StatisticsDetails = function StatisticsDetails({ defaultTitle }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { entityType, id: entityId } = useParams();

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    dispatch(setHeader(defaultTitle));
  }, [dispatch, defaultTitle]);

  useEffect(() => {
    if (entityType) {
      dispatch(fetchEntities(entityType));
    }
  }, [dispatch, entityType]);

  const handleChangeSelectedEntity = (value) => {
    const { pathname } = location || {};
    if (!pathname || typeof value === 'undefined' || value === null) {
      return;
    }
    const lastSlashIndex = pathname.lastIndexOf('/');
    if (lastSlashIndex === (-1)) {
      return;
    }
    const path = pathname.slice(0, lastSlashIndex);
    history.push(`${path}/${value}`);
  };

  return (
    <div className={styles.wrapper}>
      <EntitySelect
        selected={String(entityId)}
        onChange={handleChangeSelectedEntity}
      />
    </div>
  );
};

StatisticsDetails.propTypes = propTypes;
StatisticsDetails.defaultProps = defaultProps;

export default StatisticsDetails;
