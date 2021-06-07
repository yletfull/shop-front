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
import { namespace as NS, dndTypes } from './constants';
import reducer from './reducer';
import {
  fetchParams,
  fetchSegment,
  addSegmentParam,
  insertSegmentAttribute,
  moveSegmentAttribute,
  removeSegmentAttribute,
} from './actions';
import {
  getIsFetchingParams,
  getIsFetchingSegment,
  getParams,
  getSegment,
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

  const { id: segmentId } = useParams();

  const isFetchingParams = useSelector(getIsFetchingParams);
  const params = useSelector(getParams);

  const isFetchingSegment = useSelector(getIsFetchingSegment);
  const segmentStructure = useSelector(getSegment);

  const [isShowParams, setIsShowParams] = useState(false);

  const isNewSegment = typeof segmentId === 'undefined';

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

  useEffect(() => {
    dispatch(fetchParams());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setHeader(isNewSegment
      ? 'Новый сегмент'
      : `${defaultTitle} #${segmentId}`));

    if (!isNewSegment) {
      dispatch(fetchSegment(segmentId));
    }
  }, [dispatch, defaultTitle, isNewSegment, segmentId]);

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
  const handleSubmitParams = ({ params: selectedParams }) => {
    setIsShowParams(false);

    if (!selectedParams) {
      return;
    }

    dispatch(addSegmentParam(selectedParams));
  };

  const statistic = {};

  return (
    <div className={styles.segmentsEdit}>
      <div className={styles.segmentsEditMain}>
        <DndProvider backend={HTML5Backend}>
          <AttributesConstructor isFetching={isFetchingSegment}>
            <AttributesLabels
              isVisible={segmentStructure.length > 0}
              labels={['Датасеты', 'Телефонов', 'E-mail']}
            />
            <AttributeDropPlaceholder
              accept={dndTypes.attribute}
              position="top"
              onDrop={handleDropAttributeInPlaceholder('top')}
            />
            {segmentStructure.map((group, groupIndex) => {
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
                      groupIndex={groupIndex}
                      index={attributeIndex}
                      data={attribute}
                      dragType={dndTypes.attribute}
                      onChange={handleChangeAttribute}
                      onRemove={handleRemoveAttribute}
                    >
                      <AttributeDatasets
                        name={attribute?.title || attribute?.attributeName}
                        selected={attribute?.inDatasets || []}
                        datasets={attribute?.inDatasets || []}
                      >
                        <AttributeDatasetsForm
                          datasets={attribute?.inDatasets || []}
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

        <SaveForm />
      </div>
    </div>
  );
};

SegmentsEdit.propTypes = propTypes;
SegmentsEdit.defaultProps = defaultProps;

export default SegmentsEdit;
