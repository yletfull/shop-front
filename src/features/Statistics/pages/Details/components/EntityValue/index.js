import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useService } from '@/hooks';
import Spinner from '@/components/Spinner';
import service from './service';

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
  const [currentEntity, setCurrentEntity] = useState({});
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

  useEffect(() => {
    if (Object.keys(entities).length) {
      setCurrentEntity(entities?.find((ent) => ent.id === entityId));
    }
  }, [entities, entityId]);

  return (
    isFetching
      ? <Spinner layout="inline" />
      : (
        <span {...props}>
          {currentEntity?.title || '-'}
        </span>
      )
  );
};

EntitySelect.propTypes = propTypes;
EntitySelect.defaultProps = defaultProps;

export default EntitySelect;
