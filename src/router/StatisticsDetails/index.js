import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import { namespace as NS } from './constants';
import {
  fetchEntities,
} from './actions';
import reducer from './reducer';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const StatisticsDetails = function StatisticsDetails({ defaultTitle }) {
  const dispatch = useDispatch();

  const { entityType } = useParams();

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

  return (
    <div className={styles.wrapper}>
      StatisticsDetails
    </div>
  );
};

StatisticsDetails.propTypes = propTypes;
StatisticsDetails.defaultProps = defaultProps;

export default StatisticsDetails;
