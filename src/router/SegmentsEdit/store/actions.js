import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';
import {
  equalities,
} from '../constants';
import service from '../service';
import {
  getConditions,
} from './selectors';
import NS from './ns';

let statisticsCancelTokenSource = null;

export const attributesRequest = createAction(`${NS}/attributesRequest`);
export const attributesData = createAction(`${NS}/attributes`);
export const attributesError = createAction(`${NS}/attributesError`);

export const appendConditions = createAction(`${NS}/appendConditions`);
export const moveCondition = createAction(`${NS}/moveCondition`);
export const patchCondition = createAction(`${NS}/patchCondition`);
export const removeCondition = createAction(`${NS}/removeCondition`);

export const statisticsRequest = createAction(`${NS}/statistics/request`);
export const statisticsData = createAction(`${NS}/statistics/data`);
export const statisticsError = createAction(`${NS}/statistics/error`);

export const fetchAttributes = () => async (dispatch) => {
  dispatch(attributesRequest());

  try {
    const data = await service.fetchAttributes();

    dispatch(attributesData(data));
  } catch (error) {
    console.error(error);
    dispatch(attributesError(error));
  }
};

export const fetchStatistics = () => async (dispatch, getState) => {
  const state = getState();
  const conditions = getConditions(state);

  try {
    statisticsCancelTokenSource.cancel();
  } catch (error) {
    // do nothing
  }

  if (!conditions.length) {
    dispatch(statisticsData([]));
    return;
  }

  const areConditionsValid = conditions.every((group) => (
    group.every((condition) => (
      condition.id
      && Array.isArray(condition.datasetIds)
      && Array.isArray(condition.values)
      && (
        condition.equality === equalities.in
        || condition.values.length > 0
      )
    ))
  ));

  if (!areConditionsValid) {
    dispatch(statisticsData([]));
    return;
  }

  try {
    dispatch(statisticsRequest());

    statisticsCancelTokenSource = axios.CancelToken.source();

    const data = await service.fetchStatistics(
      { conditions },
      { cancelToken: statisticsCancelTokenSource.token },
    );

    dispatch(statisticsData(data));
  } catch (error) {
    if (!axios.isCancel(error)) {
      console.error(error);
      dispatch(statisticsError(error));
    }
  }
};
