import { createAction } from '@reduxjs/toolkit';
// import api from '@/api';
import NS from './ns';
import { getEntityType } from './selectors';

// const baseUrl = 'api/core/v1/statistics';

export const entityTypeData = createAction(`${NS}/entityType`);

export const entitiesRequest = createAction(`${NS}/entitiesRequest`);
export const entitiesData = createAction(`${NS}/entities`);
export const entitiesError = createAction(`${NS}/entitiesError`);

export const setEntityType = (data) => (dispatch) => {
  dispatch(entityTypeData(data));
};

export const fetchEntities = () => async (dispatch, getState) => {
  const state = getState();
  const entityType = getEntityType(state);
  console.log(entityType);

  if (!entityType) {
    return;
  }

  try {
    dispatch(entitiesError(false));
    dispatch(entitiesRequest(true));

    // const response = await api
    // .get(`${baseUrl}/${encodeURIComponent(entityType)}/dict`);
    // dispatch(entitiesData(response.data.data));
    dispatch(entitiesData([]));
  } catch (error) {
    console.error(error);
    dispatch(entitiesError(error));
  } finally {
    dispatch(entitiesRequest(false));
  }
};

export default {
  fetchEntities,
  setEntityType,
};
