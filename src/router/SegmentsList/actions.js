import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';
import { getMeta } from './selectors';
import service from './service';

export const requestData = createAction(`${NS}/request`);
export const updateData = createAction(`${NS}/updateData`);
export const updateMeta = createAction(`${NS}/updateMeta`);

export const fetchSegments = (params) => async (dispatch) => {
  dispatch(requestData());
  try {
    const response = await service.fetchSegments(params);
    const { data, meta } = response || {};
    dispatch(updateData(data || []));
    dispatch(updateMeta(meta || {}));
  } catch (error) {
    console.error(error);
    dispatch(updateData([]));
    dispatch(updateMeta({}));
  }
};

export const updatePagination = (pagination) => (dispatch, getState) => {
  const meta = getMeta(getState());
  dispatch(updateMeta({
    ...meta,
    pagination: {
      ...meta.pagination || {},
      ...pagination,
    },
  }));
};
