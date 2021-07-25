import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import cx from 'classnames';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import DownloadFilesForm from '@/components/segments/DownloadFilesForm';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import {
  namespace as NS,
  segmentProps,
} from './constants';
import reducer from './reducer';
import {
  fetchParams,
  fetchSegment,
  resetSegment,
  addSegmentAttribute,
  moveCondition,
  removeSegmentAttribute,
  updateSegmentAttribute,
  fetchSegmentStatistics,
  // fetchAttributeStatistics,
  saveSegment,
} from './actions';
import {
  formatSegmentAttributesListForRequest,
} from './helpers';
import {
  getIsFetchingParams,
  getIsFetchingSegment,
  getIsSubmittingSegment,
  getParams,
  getSegmentAttributes,
  getSegmentId,
  getSegmentName,
  getSegmentStatistics,
} from './selectors';
import LogicOperator from './components/LogicOperator';
import DropArea from './components/DropArea';
import Condition from './components/Condition';
import AttributesConstructor from './AttributesConstructor';
import AttributesLabels from './AttributesLabels';
import Params from './Params';
import ParamsForm from './ParamsForm';
import SelectFilePlatform from './SelectFilePlatform';
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
  const dispatch = useDispatch();

  const history = useHistory();
  const { id: paramsSegmentId } = useParams();

  const isFetchingParams = useSelector(getIsFetchingParams);
  const params = useSelector(getParams);

  const isFetchingSegment = useSelector(getIsFetchingSegment);
  const isSubmittingSegment = useSelector(getIsSubmittingSegment);
  const segmentAttributes = useSelector(getSegmentAttributes);
  const segmentId = useSelector(getSegmentId);
  const segmentName = useSelector(getSegmentName);
  const segmentStatistics = useSelector(getSegmentStatistics);

  const downloadLinkRef = useRef(null);

  const [downloadError, setDownloadError] = useState(null);
  const [downloadedSegment, setDownloadedSegment] = useState(null);
  const [isShowParams, setIsShowParams] = useState(false);
  const [isSegmentChanged, setIsSegmentChanged] = useState(false);
  const [
    isRequestedDownloadSegment,
    setIsRequestedDownloadSegment,
  ] = useState(false);

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
    return () => dispatch(resetSegment());
  }, [dispatch, isNewSegment, paramsSegmentId]);

  useEffect(() => {
    if (false) {
      dispatch(fetchSegmentStatistics({
        title: segmentName || '',
        attributes: segmentAttributes || [],
      }));
    }
  }, [dispatch, segmentName, segmentAttributes]);

  const handleChangeAttribute = (position, values) => {
    if (!position || !Array.isArray(position) || position.length < 2) {
      return;
    }
    setIsSegmentChanged(true);
    dispatch(updateSegmentAttribute(position, values));
    // dispatch(fetchAttributeStatistics(position));
  };
  const handleSelectDownloadFile = (platform) => {
    setDownloadedSegment({ type: platform });
  };
  const handleClickShowParams = () => {
    setIsShowParams(true);
  };
  const handleCloseDownloadForm = () => {
    setDownloadError(null);
    setDownloadedSegment(null);
  };
  const handleCloseParamsForm = () => {
    setIsShowParams(false);
  };
  const handleRemoveAttribute = (position) => {
    setIsSegmentChanged(true);
    dispatch(removeSegmentAttribute(position));
  };
  const handleSubmitDownloadForm = async (values) => {
    const {
      sources: entityTypes,
      count: splitFilesCount,
      name: fileName,
      samples: sampleRowsSize,
    } = values;
    const {
      type: adsPlatform,
    } = downloadedSegment;

    if (!fileName || !entityTypes || !Array.isArray(entityTypes)) {
      return;
    }

    setIsRequestedDownloadSegment(true);

    const attributes = formatSegmentAttributesListForRequest(segmentAttributes);
    try {
      const url = await service.getSegmentDownloadLink(
        isSegmentChanged ? null : segmentId,
        {
          adsPlatform,
          fileName,
          sampleRowsSize,
          splitFilesCount,
          entityTypes,
          segment: { [segmentProps.attributes]: attributes },
        },
      );
      if (!url) {
        return;
      }
      const { current: linkNode } = downloadLinkRef || {};
      linkNode.download = fileName;
      linkNode.href = url;
      linkNode.click();

      setDownloadedSegment(null);
      setDownloadError(null);
    } catch (error) {
      if (error.response) {
        setDownloadError(error.response);
      }
      console.error(error);
    }

    setIsRequestedDownloadSegment(false);
  };
  const handleSubmitParams = (selectedParams) => {
    setIsShowParams(false);
    if (!selectedParams) {
      return;
    }
    setIsSegmentChanged(true);
    dispatch(addSegmentAttribute(selectedParams));
  };
  const handleSubmitSaveForm = ({ fileName }) => {
    if (!fileName) {
      return;
    }
    const onSuccessCallback = () => history.push('/segments');
    dispatch(saveSegment({
      attributes: segmentAttributes,
      id: isNewSegment ? paramsSegmentId : null,
      title: fileName,
    }, onSuccessCallback));
  };

  const handleConditionDrop = (target, source) => {
    dispatch(moveCondition({ source, target }));
  };

  /* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */
  return (
    <div className={styles.segmentsEdit}>
      <div className={styles.segmentsEditMain}>
        <DndProvider backend={HTML5Backend}>
          <AttributesConstructor isFetching={isFetchingSegment}>
            <AttributesLabels
              isVisible={segmentAttributes.length > 0}
              labels={['Датасеты', 'Телефонов']}
            />
            {segmentAttributes.reduce((groupAcc, group, groupIndex, groups) => {
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
                        key={key('itself')}
                        attributeId={condition.id}
                        datasetIds={condition.datasetIds}
                        negation={condition.negation}
                        equality={condition.equality}
                        values={condition.values}
                        groupIndex={groupIndex}
                        index={conditionIndex}
                        onChange={handleChangeAttribute}
                        onRemove={handleRemoveAttribute}
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
          </AttributesConstructor>
        </DndProvider>

        <Params
          isFetching={isFetchingParams}
          isVisible={isShowParams}
          form={(
            <ParamsForm
              data={params}
              onCancel={handleCloseParamsForm}
              onSubmit={handleSubmitParams}
            />
          )}
          onCloseForm={handleCloseParamsForm}
        >
          <Button
            type="button"
            onClick={handleClickShowParams}
          >
            + добавить параметр
          </Button>
        </Params>
      </div>

      <div className={styles.segmentsEditAside}>
        <h2 className={styles.segmentsEditTitle}>
          Итоговая выборка
        </h2>

        <Statistics
          isFetching={segmentStatistics.isFetching}
          emailsCount={segmentStatistics.emails}
          phonesCount={segmentStatistics.phones}
          error={segmentStatistics.error}
        />

        <h3
          className={cx(
            styles.segmentsEditTitle,
            styles.segmentsEditTitle_level3,
          )}
        >
          Файлы для площадок
        </h3>

        <SelectFilePlatform
          platforms={[
            { label: 'VK', value: 'VK' },
            { label: 'FB', value: 'FACEBOOK' },
            { label: 'MailRu', value: 'MAIL_RU' },
            { label: 'Яндекс', value: 'YANDEX' },
          ]}
          onSelect={handleSelectDownloadFile}
        />

        <h3
          className={cx(
            styles.segmentsEditTitle,
            styles.segmentsEditTitle_level3,
          )}
        >
          Сохранение сегмента
        </h3>

        <SaveForm
          isDisabled={isFetchingSegment || isSubmittingSegment}
          name={segmentName}
          onSubmit={handleSubmitSaveForm}
        />
      </div>

      {Boolean(downloadedSegment) && (
        <Modal
          title={(
            <span>
              Сохранение файлов для
              {' '}
              {downloadedSegment?.type.toUpperCase() || ''}
            </span>
          )}
          onClose={handleCloseDownloadForm}
        >
          <DownloadFilesForm
            id={downloadedSegment?.id}
            isDisabled={isRequestedDownloadSegment}
            name={downloadedSegment?.name}
            onClose={handleCloseDownloadForm}
            onSubmit={handleSubmitDownloadForm}
          />
          <a ref={downloadLinkRef} />
          {downloadError && (
            <span className={styles.segmentsEditError}>
              При экспорте файла возникла ошибка
              {downloadError.status && (
                ` (код ошибки: ${downloadError.status})`
              )}
            </span>
          )}
        </Modal>
      )}
    </div>
  );
  /* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */
};

SegmentsEdit.propTypes = propTypes;
SegmentsEdit.defaultProps = defaultProps;

export default SegmentsEdit;
