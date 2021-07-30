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
  readOnly: PropTypes.bool,
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
  readOnly: false,
  profileTitle: null,
  onChange: () => {},
  onRemove: () => {},
};

const getAttributeTitle = (attribute) => (
  attribute.title || attribute.attributeName || attribute.id
);

const Condition = function SegmentEditorCondition({
  readOnly,
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
      className={styles.wrapper}
      data-is-dragging={String(isDragging)}
    >
      <div className={styles.aside}>
        {!readOnly && (
          <span
            className={cx(
              styles.control,
              styles.controlDrag,
            )}
            onMouseOver={handleDragAreaMouseover}
            onMouseLeave={handleDragAreaMouseleave}
            onFocus={handleDragAreaMouseover}
            onBlur={handleDragAreaMouseleave}
          >
            <IconBars />
          </span>
        )}
      </div>

      <div className={styles.main}>
        <div className={styles.section}>
          <span className={styles.title}>
            {getAttributeTitle(attribute)}
          </span>
          {Boolean(profileTitle) && (
            <div
              className={styles.profileTitle}
              title={profileTitle}
            >
              {profileTitle}
            </div>
          )}
        </div>

        <div className={styles.section}>
          <ConditionControl
            readOnly={readOnly}
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

      <ConditionDatasets
        readOnly={readOnly}
        attributeName={getAttributeTitle(attribute)}
        value={datasetIds}
        options={attribute?.datasets || []}
        onChange={handleDatasetIdsChange}
      />

      <ConditionStatistics
        {...statistics}
        fields={statisticsFields}
        onReload={handleStatisticsReload}
      />

      <div className={styles.aside}>
        {!readOnly && (
          <button
            type="button"
            className={cx(
              styles.button,
              styles.control,
              styles.controlRemove,
            )}
            onClick={handleRemoveClick}
          >
            <IconTimes />
          </button>
        )}
      </div>

      <div className={styles.attributeOverlay} />
    </div>
  );
};

Condition.propTypes = propTypes;
Condition.defaultProps = defaultProps;

export default Condition;
