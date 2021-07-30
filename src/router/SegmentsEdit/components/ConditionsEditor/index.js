import React from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Spinner from '@/components/Spinner';
import { equalities } from '../../constants';
import Condition from '../Condition';
import DropArea from './DropArea';
import LogicOperator from './LogicOperator';
import useModel from './use-model';
import useMapAttribute from './use-map-attribute';
import useMapProfileTitle from './use-map-profile-title';
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
  attributesTree: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string,
      attributes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          attributeName: PropTypes.string,
          title: PropTypes.string,
        }),
      ),
    }),
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
  attributesTree,
  readOnly,
  onChange,
}) {
  const {
    handleConditionPatch,
    handleConditionMove,
    handleConditionRemove,
  } = useModel(conditions, onChange);
  const mapAttribute = useMapAttribute(attributesTree);
  const mapProfileTitle = useMapProfileTitle(attributesTree);

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
                isFirst={groupIndex === 0}
                align="middle"
                onDrop={handleConditionMove}
              />
            ),
            ...group.reduce((acc, condition, conditionIndex) => {
              const key = (k) => `attribute-${condition.clientId}-${k}`;
              const attribute = mapAttribute[condition.id] || {};
              const profileTitle = mapProfileTitle[attribute.profileId] || '';

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
                    onDrop={handleConditionMove}
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
                    attribute={attribute}
                    profileTitle={profileTitle}
                    onChange={handleConditionPatch}
                    onRemove={handleConditionRemove}
                  />
                ),
                (conditionIndex === group.length - 1) && (
                  <DropArea
                    key={key('drop-end')}
                    group={groupIndex}
                    index={conditionIndex + 1}
                    align="end"
                    onDrop={handleConditionMove}
                  />
                ),
              ]);
            }, []),
            (groupIndex === groups.length - 1) && (
              <DropArea
                key={groupKey('drop-end')}
                group={groupIndex + 1}
                index={-1}
                isLast
                align="middle"
                onDrop={handleConditionMove}
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
