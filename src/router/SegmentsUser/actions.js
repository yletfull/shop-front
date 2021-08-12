import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';
import service from './service';

export const requestAttributes = createAction(`${NS}/request/attributes`);
export const requestSegments = createAction(`${NS}/request/segments`);
export const updateAttributes = createAction(`${NS}/update/attributes`);
export const updateSegments = createAction(`${NS}/update/segments`);

export const fetchAttributes = (entity) => async (dispatch) => {
  if (!entity) {
    return;
  }
  dispatch(requestAttributes());
  try {
    const response = await service.fetchAttributes(entity);
    dispatch(updateAttributes(response));
  } catch (error) {
    dispatch(updateAttributes({}));
    console.error(error);
  }
};
export const fetchSegments = (entity, params) => async (dispatch) => {
  if (!entity) {
    return;
  }
  dispatch(updateSegments({}));
  dispatch(requestSegments());
  try {
    const response = await service.fetchSegments(entity, params);
    dispatch(updateSegments(response));
  } catch (error) {
    dispatch(updateSegments({}));
    console.error(error);
  }
};
