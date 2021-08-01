import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import cx from 'classnames';
import { injectReducer } from '@/store';
import { setHeader } from '@/store/ui/actions';
import Grid, { GridCell } from '@/components/Grid';
import ErrorMessageBlock from '@/components/ErrorMessageBlock';
import ConditionsEditor from '@/features/Segments/components/ConditionsEditor';
import TotalStatistics from '@/features/Segments/components/TotalStatistics';
import ExportFiles from '@/features/Segments/components/ExportFiles';
import reducer from '@/features/Segments/store/reducer';
import {
  fetchAttributes,
  conditionsChange,
  fetchStatistics,
} from '@/features/Segments/store/actions';
import {
  getAreAttributesFetching,
  getAttributesTree,
  getConditions,
  getIsStatisticsFetching,
  getStatistics,
  getStatisticsError,
} from '@/features/Segments/store/selectors';
import service from './service';
import styles from './styles.module.scss';

const SegmentsDetails = function SegmentsDetailsPage() {
  useEffect(() => {
    injectReducer(reducer.NS, reducer);
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch]);

  const areAttributesFetching = useSelector(getAreAttributesFetching);
  const attributesTree = useSelector(getAttributesTree);

  const conditions = useSelector(getConditions);
  const isStatisticsFetching = useSelector(getIsStatisticsFetching);
  const statistics = useSelector(getStatistics);
  const statisticsError = useSelector(getStatisticsError);

  useEffect(() => {
    dispatch(setHeader('Детали сегмента'));
  }, [dispatch]);

  const [isFetching, setIsFetching] = useState(false);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState(null);

  const pathParams = useParams();
  const pathId = pathParams.id;
  useEffect(() => {
    const fetchSegment = async () => {
      try {
        dispatch(conditionsChange([]));
        setIsFetching(true);
        setError(null);

        const saved = await service.getSegment(pathId);

        dispatch(conditionsChange(saved.conditions));
        dispatch(fetchStatistics());
        dispatch(setHeader(`Детали сегмента «${saved.title}»`));
        setMeta(saved);
        setIsFetching(false);
      } catch (thrown) {
        setIsFetching(false);
        setError(thrown);
      }
    };

    fetchSegment();
  }, [dispatch, pathId]);

  const handleRetryStatisticsFetch = () => dispatch(fetchStatistics());

  return (
    <Grid>
      <GridCell
        columns={9}
      >
        <ConditionsEditor
          readOnly
          isFetching={isFetching || areAttributesFetching}
          conditions={conditions}
          isAttributesTreeFetching={areAttributesFetching}
          attributesTree={attributesTree}
        />
      </GridCell>

      <GridCell
        columns={3}
        className={styles.aside}
      >
        <h2 className={styles.asideTitle}>
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
            styles.asideTitle,
            styles.asideTitleSmall,
          )}
        >
          Файлы для площадок
        </h3>

        <ExportFiles
          defaultFileName={meta?.title || ''}
          segmentId={meta?.id || pathId}
          statistics={statistics}
        />

        {Boolean(meta?.description) && (
          <Fragment>
            <h3
              className={cx(
                styles.asideTitle,
                styles.asideTitleSmall,
              )}
            >
              Описание сегмента
            </h3>

            <div className={styles.asideMeta}>
              {meta.description}
            </div>
          </Fragment>
        )}

        {Boolean(error) && (
          <ErrorMessageBlock
            error={error}
          />
        )}
      </GridCell>
    </Grid>
  );
};

export default SegmentsDetails;
