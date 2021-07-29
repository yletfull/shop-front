import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import IconBars from '@/icons/BarsLight';
import IconTimes from '@/icons/TimesLight';
import {
  equalities,
  statisticsFields,
} from '../../constants';
import ConditionControl from '../ConditionControl';
import ConditionDatasets from '../ConditionDatasets';
import ConditionStatistics from '../ConditionStatistics';
import useDrag from './use-drag';
import useStatistics from './use-statistics';
import styles from './styles.module.scss';

const propTypes = {
  groupIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  attributeId: PropTypes.number.isRequired,
  datasetIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  negation: PropTypes.bool.isRequired,
  equality: PropTypes.oneOf(Object.values(equalities)).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  attribute: PropTypes.shape({
    id: PropTypes.number,
    attributeName: PropTypes.string,
    title: PropTypes.string,
    datasets: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    minValue: PropTypes.string,
    maxValue: PropTypes.string,
  }).isRequired,
  profileTitle: PropTypes.string,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
};
const defaultProps = {
  profileTitle: null,
  onChange: () => {},
  onRemove: () => {},
};

const getAttributeTitle = (attribute) => (
  attribute.title || attribute.attributeName || attribute.id
);

const Condition = function SegmentEditorCondition({
  groupIndex,
  index,
  attributeId,
  datasetIds,
  negation,
  equality,
  values,
  attribute,
  profileTitle,
  onChange,
  onRemove,
}) {
  const {
    dragRef,
    isDragging,
    handleDragAreaMouseover,
    handleDragAreaMouseleave,
  } = useDrag({ groupIndex, index });

  const statisticsParams = {
    attribute,
    attributeId,
    datasetIds,
    equality,
    negation,
    values,
  };
  const statistics = useStatistics(statisticsParams);
  const handleStatisticsReload = () => statistics.fetch(statisticsParams);

  const handleNegationChange = (nextNegation) => {
    onChange([groupIndex, index], { negation: nextNegation });
  };
  const handleEqualityChange = (nextEquality) => {
    onChange([groupIndex, index], { equality: nextEquality });
  };
  const handleValuesChange = (nextValues) => {
    onChange([groupIndex, index], { values: nextValues });
  };
  const handleDatasetIdsChange = (nextDatasetIds) => {
    onChange([groupIndex, index], { datasetIds: nextDatasetIds });
  };

  const handleRemoveClick = () => {
    statistics.cancel();
    onRemove([groupIndex, index]);
  };

  return (
    <div
      ref={dragRef}
      className={styles.attribute}
      data-is-dragging={String(isDragging)}
    >
      <div className={styles.attributeAside}>
        <span
          className={cx(
            styles.attributeControl,
            styles.attributeControlDrag,
          )}
          onMouseOver={handleDragAreaMouseover}
          onMouseLeave={handleDragAreaMouseleave}
          onFocus={handleDragAreaMouseover}
          onBlur={handleDragAreaMouseleave}
        >
          <IconBars />
        </span>
      </div>

      <div className={styles.attributeMain}>
        <div className={styles.attributeSection}>
          <span className={styles.attributeTitle}>
            {getAttributeTitle(attribute)}
          </span>
          {Boolean(profileTitle) && (
            <div
              className={styles.attributeProfile}
              title={profileTitle}
            >
              {profileTitle}
            </div>
          )}
        </div>

        <div className={styles.attributeSection}>
          <ConditionControl
            type={attribute.type}
            options={attribute.options}
            negation={negation}
            equality={equality}
            values={values}
            onNegationChange={handleNegationChange}
            onEqualityChange={handleEqualityChange}
            onValuesChange={handleValuesChange}
          />
        </div>
      </div>

      <div>
        <ConditionDatasets
          attributeName={getAttributeTitle(attribute)}
          value={datasetIds}
          options={attribute?.datasets || []}
          onChange={handleDatasetIdsChange}
        />
      </div>

      <ConditionStatistics
        {...statistics}
        fields={statisticsFields}
        onReload={handleStatisticsReload}
      />

      <div className={styles.attributeAside}>
        <button
          type="button"
          className={cx(
            styles.attributeButton,
            styles.attributeControl,
            styles.attributeControlRemove,
          )}
          onClick={handleRemoveClick}
        >
          <IconTimes />
        </button>
      </div>

      <div className={styles.attributeOverlay} />
    </div>
  );
};

Condition.propTypes = propTypes;
Condition.defaultProps = defaultProps;

export default Condition;
