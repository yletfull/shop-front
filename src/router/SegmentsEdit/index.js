import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import cx from 'classnames';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import Button from '@/components/Button';
import {
  attributeProps,
  attributeTypes,
  namespace as NS,
  dndTypes,
  segmentProps,
} from './constants';
import reducer from './reducer';
import {
  fetchParams,
  fetchSegment,
  addSegmentAttribute,
  insertSegmentAttribute,
  moveSegmentAttribute,
  removeSegmentAttribute,
  updateSegmentAttribute,
} from './actions';
import {
  getIsFetchingParams,
  getIsFetchingSegment,
  getParams,
  getSegmentAttributes,
  getSegmentId,
  getSegmentName,
} from './selectors';
import Attribute from './Attribute';
import AttributeDatasets from './AttributeDatasets';
import AttributeDatasetsForm from './AttributeDatasetsForm';
import AttributeDropPlaceholder from './AttributeDropPlaceholder';
import AttributeStatistics from './AttributeStatistics';
import AttributesConstructor from './AttributesConstructor';
import AttributesGroup from './AttributesGroup';
import AttributesLabels from './AttributesLabels';
import Params from './Params';
import ParamsForm from './ParamsForm';
import SaveForm from './SaveForm';
import Statistics from './Statistics';
import service from './service';
import styles from './styles.module.scss';

const propTypes = {
  defaultTitle: PropTypes.string,
};

const defaultProps = {
  defaultTitle: '',
};

const SegmentsEdit = function SegmentsEdit({ defaultTitle }) {
  const generateKeyByIndex = (key, index) => `${key}-${index}`;

  const dispatch = useDispatch();

  const { id: paramsSegmentId } = useParams();

  const isFetchingParams = useSelector(getIsFetchingParams);
  const params = useSelector(getParams);

  const isFetchingSegment = useSelector(getIsFetchingSegment);
  const segmentAttributes = useSelector(getSegmentAttributes);
  const segmentId = useSelector(getSegmentId);
  const segmentName = useSelector(getSegmentName);

  const [isShowParams, setIsShowParams] = useState(false);

  const isNewSegment = typeof paramsSegmentId === 'undefined';

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    dispatch(fetchParams());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setHeader(isNewSegment
      ? 'Новый сегмент'
      : `${defaultTitle} #${segmentId || paramsSegmentId}`));
  }, [dispatch, defaultTitle, isNewSegment, paramsSegmentId, segmentId]);

  useEffect(() => {
    if (!isNewSegment) {
      dispatch(fetchSegment(paramsSegmentId));
    }
  }, [dispatch, isNewSegment, paramsSegmentId]);

  const handleChangeAttribute = (attribute) => {
    console.log(attribute);
  };
  const handleClickShowParams = () => {
    setIsShowParams(true);
  };
  const handleCloseParamsForm = () => {
    setIsShowParams(false);
  };
  const handleDropAttribute = (targetGroupIndex) => (sourceIndexes) => {
    const [sourceGroupIndex, sourceAttributeIndex] = sourceIndexes?.from || [];
    if (typeof sourceGroupIndex === 'undefined'
      || typeof sourceAttributeIndex === 'undefined'
      || sourceGroupIndex === targetGroupIndex) {
      return;
    }
    dispatch(moveSegmentAttribute(
      [sourceGroupIndex, sourceAttributeIndex],
      [targetGroupIndex, 0],
    ));
  };
  const handleDropAttributeInPlaceholder = (position) => (sourceIndexes) => {
    const [sourceGroupIndex, sourceAttributeIndex] = sourceIndexes?.from || [];
    if (typeof sourceGroupIndex === 'undefined'
      || typeof sourceAttributeIndex === 'undefined') {
      return;
    }
    dispatch(insertSegmentAttribute(
      position,
      [sourceGroupIndex, sourceAttributeIndex],
    ));
  };
  const handleRemoveAttribute = (position) => {
    const [groupIndex, attributeIndex] = position || [];
    if (typeof attributeIndex === 'undefined'
      || typeof groupIndex === 'undefined') {
      return;
    }
    dispatch(removeSegmentAttribute([
      Number(groupIndex),
      Number(attributeIndex),
    ]));
  };
  const handleSubmitAttribute = (position, values) => {
    dispatch(updateSegmentAttribute(position, values));
  };
  const handleSubmitParams = ({ params: selectedParams }) => {
    setIsShowParams(false);

    if (!selectedParams) {
      return;
    }

    dispatch(addSegmentAttribute(selectedParams));
  };
  const handleSubmitSaveForm = async ({ fileName }) => {
    const mapOrSegmentAttributes = (attr) => {
      const {
        datasetIds,
        equality: type,
        id: attributeId,
        negation,
        values,
      } = attr || {};
      return ({
        attribute: attr,
        attributeId,
        datasetIds,
        negation,
        type,
        values,
      });
    };
    const mapAndSegmentAttributes = (andAttributes) => andAttributes
      .map(mapOrSegmentAttributes);
    try {
      await service.saveSegment({
        ...(isNewSegment ? { [segmentProps.id]: paramsSegmentId } : {}),
        [segmentProps.name]: fileName,
        [segmentProps.attributes]: segmentAttributes
          .map(mapAndSegmentAttributes),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const statistic = {};

  return (
    <div className={styles.segmentsEdit}>
      <div className={styles.segmentsEditMain}>
        <DndProvider backend={HTML5Backend}>
          <AttributesConstructor isFetching={isFetchingSegment}>
            <AttributesLabels
              isVisible={segmentAttributes.length > 0}
              labels={['Датасеты', 'Телефонов', 'E-mail']}
            />
            <AttributeDropPlaceholder
              accept={dndTypes.attribute}
              position="top"
              onDrop={handleDropAttributeInPlaceholder('top')}
            />
            {segmentAttributes.map((group, groupIndex) => {
              const groupKey = generateKeyByIndex('group', groupIndex);
              return (
                <AttributesGroup
                  key={groupKey}
                  accept={dndTypes.attribute}
                  onDrop={handleDropAttribute(groupIndex)}
                >
                  {group.map((attribute, attributeIndex) => (
                    <Attribute
                      key={`${groupKey}-${attribute.attributeName}`}
                      properties={attributeProps}
                      types={attributeTypes}
                      groupIndex={groupIndex}
                      index={attributeIndex}
                      data={attribute}
                      dragType={dndTypes.attribute}
                      onChange={handleChangeAttribute}
                      onRemove={handleRemoveAttribute}
                      onSubmit={handleSubmitAttribute}
                    >
                      <AttributeDatasets
                        name={attribute?.[attributeProps.title]
                          || attribute?.[attributeProps.name]}
                        selected={attribute?.[attributeProps.datasetsIds] || []}
                        datasets={attribute?.[attributeProps.datasets] || []}
                      >
                        <AttributeDatasetsForm
                          datasets={attribute?.[attributeProps.datasets] || []}
                        />
                      </AttributeDatasets>
                      <AttributeStatistics
                        data={attribute.statistics}
                      />
                    </Attribute>
                  ))}
                </AttributesGroup>
              );
            })}
            <AttributeDropPlaceholder
              accept={dndTypes.attribute}
              position="bottom"
              onDrop={handleDropAttributeInPlaceholder('bottom')}
            />
          </AttributesConstructor>
        </DndProvider>

        <Params
          isFetching={isFetchingParams}
          isVisible={isShowParams}
          form={(
            <ParamsForm
              data={params}
              onSubmit={handleSubmitParams}
            />
          )}
          onCloseForm={handleCloseParamsForm}
        >
          <Button
            type="button"
            onClick={handleClickShowParams}
          >
            + ещё параметр
          </Button>
        </Params>
      </div>

      <div className={styles.segmentsEditAside}>
        <h2 className={styles.segmentsEditTitle}>
          Итоговая выборка
        </h2>

        <Statistics
          emailsCount={statistic.emails}
          phonesCount={statistic.phones}
        />

        <h3
          className={cx(
            styles.segmentsEditTitle,
            styles.segmentsEditTitle_level3,
          )}
        >
          Файлы для площадок
        </h3>

        <h3
          className={cx(
            styles.segmentsEditTitle,
            styles.segmentsEditTitle_level3,
          )}
        >
          Сохранение сегмента
        </h3>

        <SaveForm
          isFetching={isFetchingSegment}
          name={segmentName}
          onSubmit={handleSubmitSaveForm}
        />
      </div>
    </div>
  );
};

SegmentsEdit.propTypes = propTypes;
SegmentsEdit.defaultProps = defaultProps;

export default SegmentsEdit;
