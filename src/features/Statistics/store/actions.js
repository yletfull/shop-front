import { createAction } from '@reduxjs/toolkit';
import api from '@/api';
import NS from './ns';

const baseUrl = 'api/v1/statistics';

export const entitiesRequest = createAction(`${NS}/entitiesRequest`);
export const entitiesData = createAction(`${NS}/entities`);
export const entitiesError = createAction(`${NS}/entitiesError`);


export const fetchEntities = (entityType) => async (dispatch) => {
  dispatch(entitiesRequest(true));

  if (!entityType) {
    return;
  }

  try {
    const response = await api.get(`${baseUrl}/${encodeURIComponent(entityType)}/dict`);
    dispatch(entitiesData(response.data.data));
  } catch (error) {
    console.error(error);
    dispatch(entitiesError(error));
  } finally {
    dispatch(entitiesRequest(false));
  }
};

export default {
  fetchEntities,
};
