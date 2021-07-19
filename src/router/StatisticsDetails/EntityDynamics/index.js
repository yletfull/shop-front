import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  getEntityDynamicsData,
  getEntityDynamicsMeta,
} from '../selectors';
import styles from './styles.module.scss';

const propTypes = {
  header: PropTypes.node,
};

const defaultProps = {
  header: null,
};

const EntityDynamics = function EntityDynamics({ header }) {
  const data = useSelector(getEntityDynamicsData);
  const meta = useSelector(getEntityDynamicsMeta);
  console.log(data, meta);
  return (
    <div className={styles.entityDynamics}>
      {header && (
        <div className={styles.entityDynamicsHeader}>
          {header}
        </div>
      )}
    </div>
  );
};

EntityDynamics.propTypes = propTypes;
EntityDynamics.defaultProps = defaultProps;

export default EntityDynamics;
