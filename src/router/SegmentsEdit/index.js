import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import cx from 'classnames';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import {
  namespace as NS,
} from './constants';
import reducer from './reducer';
import store from './store/reducer';
import {
  fetchAttributes,
  conditionsChange,
  fetchStatistics,
} from './store/actions';
import {
  getAreAttributesFetching,
  getAttributesTree,
  getConditions,
  getIsStatisticsFetching,
  getStatistics,
  getStatisticsError,
} from './store/selectors';
import {
  fetchSegment,
  resetSegment,
} from './actions';
import {
  getIsFetchingSegment,
  getSegmentId,
} from './selectors';
import ConditionsEditor from './components/ConditionsEditor';
import TotalStatistics from './components/TotalStatistics';
import ExportFiles from './components/ExportFiles';
import SaveForm from './components/SaveForm';
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

  const { id: paramsSegmentId } = useParams();

  const areAttributesFetching = useSelector(getAreAttributesFetching);
  const attributesTree = useSelector(getAttributesTree);

  const isFetchingSegment = useSelector(getIsFetchingSegment);
  const conditions = useSelector(getConditions);
  const segmentId = useSelector(getSegmentId);
  const isStatisticsFetching = useSelector(getIsStatisticsFetching);
  const statistics = useSelector(getStatistics);
  const statisticsError = useSelector(getStatisticsError);

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

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const handleSaveFormSubmit = async ({ title, description }) => {
    if (!title || isSaving) {
      return;
    }

    try {
      setIsSaving(true);
      setSaveError(null);

      await service.saveSegment({
        title,
        description,
        conditions,
      });

      setIsSaving(false);
    } catch (error) {
      setSaveError(error);
      setIsSaving(false);
    }
  };

  const handleConditionsChange = (nextConditions, meta = {}) => {
    dispatch(conditionsChange(nextConditions));

    if (meta.shouldRequestStatistics) {
      dispatch(fetchStatistics());
    }
  };

  const handleRetryStatisticsFetch = () => dispatch(fetchStatistics());

  return (
    <div className={styles.segmentsEdit}>
      <div className={styles.segmentsEditMain}>
        <ConditionsEditor
          isFetching={isFetchingSegment}
          conditions={conditions}
          isAttributesTreeFetching={areAttributesFetching}
          attributesTree={attributesTree}
          onChange={handleConditionsChange}
        />
      </div>

      <div className={styles.segmentsEditAside}>
        <h2 className={styles.segmentsEditTitle}>
          Итоговая выборка
        </h2>

        <TotalStatistics
          isFetching={isStatisticsFetching}
          data={statistics}
          error={statisticsError}
          onRetry={handleRetryStatisticsFetch}
        />

        <h3
          className={cx(
            styles.segmentsEditTitle,
            styles.segmentsEditTitle_level3,
          )}
        >
          Файлы для площадок
        </h3>

        <ExportFiles
          conditions={conditions}
          statistics={statistics}
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
          isSaving={isSaving}
          error={saveError}
          onSubmit={handleSaveFormSubmit}
        />
      </div>
    </div>
  );
};

SegmentsEdit.propTypes = propTypes;
SegmentsEdit.defaultProps = defaultProps;

export default SegmentsEdit;
