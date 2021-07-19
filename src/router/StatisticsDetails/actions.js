import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';
import service from './service';

export const requestEntities = createAction(`${NS}/request/entities`);
export const updateEntities = createAction(`${NS}/update/entities`);

export const fetchEntities = (entity) => async (dispatch) => {
  if (!entity) {
    dispatch(updateEntities([]));
    return;
  }

  dispatch(requestEntities());

  try {
    const response = await service.fetchEntities(entity);
    dispatch(updateEntities(response));
  } catch (error) {
    console.error(error);
    dispatch(updateEntities([]));
  }
};
