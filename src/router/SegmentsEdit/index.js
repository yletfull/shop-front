import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import cx from 'classnames';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import DownloadFilesForm from '@/components/segments/DownloadFilesForm';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import {
  attributeProps,
  attributeTypes,
  equalityTypes,
  namespace as NS,
  dndTypes,
  segmentProps,
} from './constants';
import reducer from './reducer';
import {
  fetchParams,
  fetchSegment,
  resetSegment,
  addSegmentAttribute,
  insertSegmentAttribute,
  moveSegmentAttribute,
  removeSegmentAttribute,
  updateSegmentAttribute,
  fetchSegmentStatistics,
  fetchAttributesStatistics,
} from './actions';
import {
  formatSegmentAttributesListForRequest,
} from './helpers';
import {
  getAttributesStatistics,
  getIsFetchingParams,
  getIsFetchingSegment,
  getParams,
  getSegmentAttributes,
  getSegmentId,
  getSegmentName,
  getSegmentStatistics,
} from './selectors';
import Attribute from './Attribute';
import AttributeDatasets from './AttributeDatasets';
import AttributeDatasetsForm from './AttributeDatasetsForm';
import AttributeDatasetsSelect from './AttributeDatasetsSelect';
import AttributeDropPlaceholder from './AttributeDropPlaceholder';
import AttributeStatistics from './AttributeStatistics';
import AttributesConstructor from './AttributesConstructor';
import AttributesGroup from './AttributesGroup';
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
  const generateKeyByIndex = (key, index) => `${key}-${index}`;

  const dispatch = useDispatch();

  const { id: paramsSegmentId } = useParams();

  const isFetchingParams = useSelector(getIsFetchingParams);
  const params = useSelector(getParams);

  const attributesStatistics = useSelector(getAttributesStatistics);
  const isFetchingSegment = useSelector(getIsFetchingSegment);
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
    dispatch(fetchAttributesStatistics(segmentAttributes));
  }, [dispatch, segmentAttributes]);

  useEffect(() => {
    dispatch(fetchSegmentStatistics({
      title: segmentName || '',
      attributes: segmentAttributes || [],
    }));
  }, [dispatch, segmentName, segmentAttributes]);

  const handleChangeAttribute = (position, attribute) => {
    const [groupIndex, attributeIndex] = position;
    if (typeof attributeIndex === 'undefined'
      || typeof groupIndex === 'undefined') {
      return;
    }
    setIsSegmentChanged(true);
    dispatch(updateSegmentAttribute([groupIndex, attributeIndex], attribute));
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
  const handleDropAttribute = (targetGroupIndex) => (sourceIndexes) => {
    const [sourceGroupIndex, sourceAttributeIndex] = sourceIndexes?.from || [];
    if (typeof sourceGroupIndex === 'undefined'
      || typeof sourceAttributeIndex === 'undefined'
      || sourceGroupIndex === targetGroupIndex) {
      return;
    }
    setIsSegmentChanged(true);
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
    setIsSegmentChanged(true);
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
    setIsSegmentChanged(true);
    dispatch(removeSegmentAttribute([
      Number(groupIndex),
      Number(attributeIndex),
    ]));
  };
  const handleSubmitAttribute = (position, values) => {
    dispatch(updateSegmentAttribute(position, values));
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
  const handleSubmitSaveForm = async ({ fileName }) => {
    const attributes = formatSegmentAttributesListForRequest(segmentAttributes);
    try {
      await service.saveSegment({
        ...(isNewSegment ? { [segmentProps.id]: paramsSegmentId } : {}),
        [segmentProps.name]: fileName,
        [segmentProps.attributes]: attributes,
      });
    } catch (error) {
      console.error(error);
    }
  };

  /* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */
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
                  {group.map((attribute, attributeIndex) => {
                    const {
                      [attributeProps.datasets]: datasets,
                      [attributeProps.datasetIds]: datasetIds,
                      [attributeProps.name]: name,
                      [attributeProps.title]: title,
                    } = attribute || {};
                    const getStatistics = (position) => {
                      const [gIndex, aIndex] = position || [];
                      if (typeof gIndex === 'undefined'
                        || typeof aIndex === 'undefined') {
                        return null;
                      }
                      return attributesStatistics[gIndex]?.[aIndex] || null;
                    };
                    return (
                      <Attribute
                        key={`${groupKey}-${attribute.attributeName}`}
                        properties={attributeProps}
                        types={attributeTypes}
                        equalityTypes={equalityTypes}
                        groupIndex={groupIndex}
                        index={attributeIndex}
                        data={attribute}
                        dragType={dndTypes.attribute}
                        onChange={handleChangeAttribute}
                        onRemove={handleRemoveAttribute}
                        onSubmit={handleSubmitAttribute}
                      >
                        <AttributeDatasets
                          name={title || name}
                          selected={datasetIds || []}
                          datasets={datasets || []}
                        >
                          <AttributeDatasetsSelect
                            datasets={datasets || []}
                            selected={datasetIds || []}
                          >
                            <AttributeDatasetsForm
                              groupIndex={groupIndex}
                              attributeIndex={attributeIndex}
                              datasets={datasets || []}
                              selected={datasetIds || []}
                              onSubmit={handleSubmitAttribute}
                            />
                          </AttributeDatasetsSelect>
                        </AttributeDatasets>
                        <AttributeStatistics
                          data={getStatistics([groupIndex, attributeIndex])}
                        />
                      </Attribute>
                    );
                  })}
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
          emailsCount={segmentStatistics.emails}
          phonesCount={segmentStatistics.phones}
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
          isFetching={isFetchingSegment}
          name={segmentName}
          onSubmit={handleSubmitSaveForm}
        />
      </div>

      <Modal
        header={(
          <span>
            Сохранение файлов для
            {' '}
            {downloadedSegment?.type.toUpperCase() || ''}
          </span>
        )}
        isVisible={Boolean(downloadedSegment)}
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
    </div>
  );
  /* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */
};

SegmentsEdit.propTypes = propTypes;
SegmentsEdit.defaultProps = defaultProps;

export default SegmentsEdit;
