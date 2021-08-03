import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';
import { injectReducer } from '@/store';
import AppMain from '@/components/AppMain';
import Grid, { GridCell } from '@/components/Grid';
import ConditionsEditor from '@/features/Segments/components/ConditionsEditor';
import PageHeader from '@/components/PageHeader';
import TotalStatistics from '@/features/Segments/components/TotalStatistics';
import ExportFiles from '@/features/Segments/components/ExportFiles';
import SaveForm from '@/features/Segments/components/SaveForm';
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

const SegmentsNew = function SegmentsNewPage() {
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

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const history = useHistory();
  const handleSaveFormSubmit = async ({ title, description }) => {
    if (!title || isSaving) {
      return;
    }

    try {
      setIsSaving(true);
      setSaveError(null);

      const { id } = await service.saveSegment({
        title,
        description,
        conditions,
      });

      setIsSaving(false);

      history.replace(`/segments/details/${id}`);
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
    <AppMain
      backTo="/segments"
      header={(
        <PageHeader>
          Новый сегмент
        </PageHeader>
      )}
    >
      <Grid>
        <GridCell
          columns={9}
        >
          <ConditionsEditor
            isFetching={false}
            conditions={conditions}
            isAttributesTreeFetching={areAttributesFetching}
            attributesTree={attributesTree}
            onChange={handleConditionsChange}
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
            conditions={conditions}
            statistics={statistics}
          />

          <h3
            className={cx(
              styles.asideTitle,
              styles.asideTitleSmall,
            )}
          >
            Сохранение сегмента
          </h3>

          <SaveForm
            isSaving={isSaving}
            error={saveError}
            onSubmit={handleSaveFormSubmit}
          />
        </GridCell>
      </Grid>
    </AppMain>
  );
};

export default SegmentsNew;
