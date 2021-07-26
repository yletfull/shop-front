import { createAction } from '@reduxjs/toolkit';
import service from '../service';
import NS from './ns';

export const attributesRequest = createAction(`${NS}/attributesRequest`);
export const attributesData = createAction(`${NS}/attributes`);
export const attributesError = createAction(`${NS}/attributesError`);

export const appendConditions = createAction(`${NS}/appendConditions`);
export const moveCondition = createAction(`${NS}/moveCondition`);
export const patchCondition = createAction(`${NS}/patchCondition`);
export const removeCondition = createAction(`${NS}/removeCondition`);

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
