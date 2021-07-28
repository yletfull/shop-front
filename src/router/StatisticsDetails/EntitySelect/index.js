import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useService } from '@/hooks';
import Select from '@/components/Select';
import service from './service';
import styles from './styles.module.scss';

const propTypes = {
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  selected: '',
  onChange: () => {},
};

const EntitySelect = function EntitySelect({
  selected,
  onChange,
}) {
  const { entityType } = useParams();

  const { fetch, data: entities, isFetching } = useService({
    initialData: {},
    service: service.fetchEntities,
  });

  useEffect(() => {
    if (!entityType) {
      return;
    }
    fetch(entityType);
  }, [fetch, entityType]);

  const entitiesOptions = useMemo(() => {
    if (!entities || !Array.isArray(entities)) {
      return ([]);
    }
    return entities
      .reduce((acc, cur) => {
        if (!cur || !cur.id) {
          return acc;
        }
        return ([
          ...acc,
          {
            text: cur.title || cur.id,
            value: cur.id,
          },
        ]);
      }, []);
  }, [entities]);

  const handleChangeSelect = (e) => {
    const { value } = e?.target || {};
    if (!value) {
      return;
    }
    onChange(value === 'default' ? '' : value);
  };

  return (
    <div className={styles.entitySelect}>
      <Select
        options={entitiesOptions}
        value={selected}
        disabled={isFetching}
        onChange={handleChangeSelect}
      />
    </div>
  );
};

EntitySelect.propTypes = propTypes;
EntitySelect.defaultProps = defaultProps;

export default EntitySelect;
