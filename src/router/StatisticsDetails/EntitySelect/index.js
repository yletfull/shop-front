import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Select from '@/components/Select';
import {
  getEntities,
  getIsFetchingEntities,
} from '../selectors';
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
  const entities = useSelector(getEntities);
  const isFetching = useSelector(getIsFetchingEntities);

  const entitiesOptions = entities
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

  const handleChangeSelect = (e) => {
    const { value } = e?.target || {};
    if (!value) {
      return;
    }
    onChange(value === 'default' ? '' : value);
  };

  console.log(isFetching, entitiesOptions);

  return (
    <div className={styles.entitySelect}>
      <Select
        options={entitiesOptions}
        value={selected}
        onChange={handleChangeSelect}
      />
    </div>
  );
};

EntitySelect.propTypes = propTypes;
EntitySelect.defaultProps = defaultProps;

export default EntitySelect;
