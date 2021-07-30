/* eslint "no-unused-vars": "off" */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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
import store from './store/reducer';
import {
  fetchAttributes,
  appendConditions,
  moveCondition,
  patchCondition,
  removeCondition,
  fetchStatistics,
} from './store/actions';
import {
  getAreAttributesFetching,
  getAttributesTree,
  getMapAttribute,
  getMapProfileTitle,
  getConditions,
} from './store/selectors';
import {
  fetchSegment,
  resetSegment,
  saveSegment,
} from './actions';
import {
  formatSegmentAttributesListForRequest,
} from './helpers';
import {
  getIsFetchingSegment,
  getIsSubmittingSegment,
  getSegmentId,
  getSegmentName,
  getSegmentStatistics,
} from './selectors';
import ConditionsEditor from './components/ConditionsEditor';
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
  useEffect(() => {
    injectReducer(store.NS, store);
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch]);

  const history = useHistory();
  const { id: paramsSegmentId } = useParams();

  const areAttributesFetching = useSelector(getAreAttributesFetching);
  const attributesTree = useSelector(getAttributesTree);
  const mapAttribute = useSelector(getMapAttribute);
  const mapProfileTitle = useSelector(getMapProfileTitle);

  const isFetchingSegment = useSelector(getIsFetchingSegment);
  const isSubmittingSegment = useSelector(getIsSubmittingSegment);
  const conditions = useSelector(getConditions);
  const segmentId = useSelector(getSegmentId);
  const segmentName = useSelector(getSegmentName);
  const segmentStatistics = useSelector(getSegmentStatistics);

  const downloadLinkRef = useRef(null);

  const [downloadError, setDownloadError] = useState(null);
  const [downloadedSegment, setDownloadedSegment] = useState(null);
  const [isShowParams, setIsShowParams] = useState(false);
  const [
    isRequestedDownloadSegment,
    setIsRequestedDownloadSegment,
  ] = useState(false);

  const isNewSegment = typeof paramsSegmentId === 'undefined';

  useEffect(() => {
    injectReducer(NS, reducer);
  }, []);

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

    const attributes = formatSegmentAttributesListForRequest(conditions);
    try {
      const url = await service.getSegmentDownloadLink(
        segmentId,
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
  const handleSubmitSaveForm = ({ fileName }) => {
    if (!fileName) {
      return;
    }
    const onSuccessCallback = () => history.push('/segments');
    dispatch(saveSegment({
      attributes: conditions,
      id: isNewSegment ? paramsSegmentId : null,
      title: fileName,
    }, onSuccessCallback));
  };

  const handleSubmitParams = (selectedAttributes) => {
    setIsShowParams(false);
    dispatch(appendConditions(selectedAttributes));
  };
  const handleConditionChange = (position, changes) => {
    dispatch(patchCondition({ position, changes }));
    dispatch(fetchStatistics());
  };
  const handleConditionDrop = (target, source) => {
    const prevGroup = [...(conditions[source[0]] || [])];
    dispatch(moveCondition({ source, target }));

    const [sourceGroup] = source || [];
    const [targetGroup, targetIndex] = target || [];

    if (sourceGroup === targetGroup) {
      return;
    }

    if (targetIndex === -1 && prevGroup.length === 1) {
      dispatch(fetchStatistics());
    }
  };
  const handleConditionRemove = (position) => {
    dispatch(removeCondition(position));
    dispatch(fetchStatistics());
  };

  /* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */
  return (
    <div className={styles.segmentsEdit}>
      <div className={styles.segmentsEditMain}>
        <ConditionsEditor
          isFetching={isFetchingSegment}
          conditions={conditions}
          mapAttribute={mapAttribute}
          mapProfileTitle={mapProfileTitle}
        />

        <Params
          isFetching={areAttributesFetching}
          isVisible={isShowParams}
          form={(
            <ParamsForm
              data={attributesTree}
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
