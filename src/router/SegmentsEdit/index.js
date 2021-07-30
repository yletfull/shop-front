import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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
  saveSegment,
} from './actions';
import {
  getIsFetchingSegment,
  getIsSubmittingSegment,
  getSegmentId,
  getSegmentName,
} from './selectors';
import ConditionsEditor from './components/ConditionsEditor';
import TotalStatistics from './components/TotalStatistics';
import ExportFiles from './components/ExportFiles';
import SaveForm from './SaveForm';
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

  const isFetchingSegment = useSelector(getIsFetchingSegment);
  const isSubmittingSegment = useSelector(getIsSubmittingSegment);
  const conditions = useSelector(getConditions);
  const segmentId = useSelector(getSegmentId);
  const segmentName = useSelector(getSegmentName);
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
          isDisabled={isFetchingSegment || isSubmittingSegment}
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
