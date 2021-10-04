import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/Spinner';
import {
  getEntities,
  getEntitiesIsFetching,
  getEntityType,
} from '@/features/Statistics/store/selectors';
import { fetchEntities, setEntityType } from '@/features/Statistics/store/actions';


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
  const dispatch = useDispatch();

  const entities = useSelector(getEntities);
  const entityType = useSelector(getEntityType);
  const entitiesIsFetching = useSelector(getEntitiesIsFetching);

  const { entityType: paramsEntityType } = useParams();

  useEffect(() => {
    if (entityType === paramsEntityType
      || entities.length
      || entitiesIsFetching) {
      return;
    }

    dispatch(setEntityType(paramsEntityType));
    dispatch(fetchEntities());
  },
  [
    dispatch,
    entityType,
    paramsEntityType,
    entities.length,
    entitiesIsFetching,
  ]);

  const [currentEntity, setCurrentEntity] = useState({});

  useEffect(() => {
    if (Array.isArray(entities) && entities.length) {
      setCurrentEntity(entities?.find((e) => e.id === entityId));
      return;
    }
    setCurrentEntity({});
  }, [entities, entityId]);

  return (
    entitiesIsFetching
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
