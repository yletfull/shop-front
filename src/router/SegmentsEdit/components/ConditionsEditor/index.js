import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Spinner from '@/components/Spinner';
import { equalities } from '../../constants';
import LogicOperator from '../LogicOperator';
import DropArea from '../DropArea';
import Condition from '../Condition';
import styles from './styles.module.scss';

const propTypes = {
  isFetching: PropTypes.bool,
  conditions: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        datasetIds: PropTypes.arrayOf(PropTypes.number),
        negation: PropTypes.bool,
        equality: PropTypes.oneOf(Object.values(equalities)),
        values: PropTypes.arrayOf(PropTypes.string),
        clientId: PropTypes.string,
      }),
    ),
  ).isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};
const defaultProps = {
  isFetching: false,
  readOnly: false,
  onChange: () => {},
};

const ConditionsEditor = function SegmentsEditConditionsEditor({
  isFetching,
  conditions,
  readOnly,
  onChange,
}) {
  const handleConditionDrop = (...payload) => {
    console.log('drop', { payload });
    onChange(payload);
  };
  const handleConditionChange = (...payload) => {
    console.log('change', { payload });
    onChange(payload);
  };
  const handleConditionRemove = (...payload) => {
    console.log('remove', { payload });
    onChange(payload);
  };

  return (
    <div className={styles.wrapper}>
      {isFetching && <Spinner layout="overlay" />}

      <DndProvider backend={HTML5Backend}>
        <header className={styles.header}>
          labels
        </header>

        {conditions.reduce((groupAcc, group, groupIndex, groups) => {
          const groupKey = (key) => `group-${groupIndex}-${key}`;

          return ([
            ...groupAcc,
            (groupIndex > 0) && (
              <LogicOperator
                key={groupKey('and')}
                type="and"
              />
            ),
            (
              <DropArea
                key={groupKey('drop')}
                group={groupIndex}
                index={-1}
                className={cx(groupIndex === 0 && styles.dropAreaFirst)}
                align="middle"
                onDrop={handleConditionDrop}
              />
            ),
            ...group.reduce((acc, condition, conditionIndex) => {
              const key = (k) => `attribute-${condition.clientId}-${k}`;

              return ([
                ...acc,
                (conditionIndex > 0) && (
                  <LogicOperator
                    key={key('or')}
                    type="or"
                  />
                ),
                (
                  <DropArea
                    key={key('drop')}
                    group={groupIndex}
                    index={conditionIndex}
                    align={conditionIndex === 0 ? 'start' : 'middle'}
                    onDrop={handleConditionDrop}
                  />
                ),
                (
                  <Condition
                    readOnly={readOnly}
                    key={key('itself')}
                    attributeId={condition.id}
                    datasetIds={condition.datasetIds}
                    negation={condition.negation}
                    equality={condition.equality}
                    values={condition.values}
                    groupIndex={groupIndex}
                    index={conditionIndex}
                    onChange={handleConditionChange}
                    onRemove={handleConditionRemove}
                  />
                ),
                (conditionIndex === group.length - 1) && (
                  <DropArea
                    key={key('drop-end')}
                    group={groupIndex}
                    index={conditionIndex + 1}
                    align="end"
                    onDrop={handleConditionDrop}
                  />
                ),
              ]);
            }, []),
            (groupIndex === groups.length - 1) && (
              <DropArea
                key={groupKey('drop-end')}
                group={groupIndex + 1}
                index={-1}
                className={styles.dropAreaLast}
                align="middle"
                onDrop={handleConditionDrop}
              />
            ),
          ]);
        }, [])}
      </DndProvider>
    </div>
  );
};

ConditionsEditor.propTypes = propTypes;
ConditionsEditor.defaultProps = defaultProps;

export default ConditionsEditor;
