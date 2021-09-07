/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useService } from '@/hooks';
import Spinner from '@/components/Spinner';
import service from './service';
import styles from './styles.module.scss';

const propTypes = {
  entityId: PropTypes.string,
};

const defaultProps = {
  entityId: '',
};

const EntitySelect = function EntitySelect({
  entityId,
  ...props
}) {
  const { entityType } = useParams();

  const { fetch, data: entities = {}, isFetching } = useService({
    initialData: {},
    service: service.fetchEntities,
  });

  useEffect(() => {
    if (!entityType) {
      return;
    }
    fetch(entityType);
  }, [fetch, entityType]);


  const getEntity = () => {
    if (entities instanceof Object && Object.keys(entities).length) {
      return Object.values(entities).find((ent) => ent.id === entityId);
    }
    return {};
  };

  const { title } = getEntity();

  return (
    isFetching
      ? <Spinner layout="inline" />
      : (
        <span>
          {title || '-'}
        </span>
      )
  );
};

EntitySelect.propTypes = propTypes;
EntitySelect.defaultProps = defaultProps;

export default EntitySelect;
