import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';
import service from './service';

export const requestDictionary = createAction(`${NS}/request/dictinary`);
export const updateDictionary = createAction(`${NS}/update/dictinary`);

export const fetchDictionary = (entity) => async (dispatch) => {
  if (!entity) {
    dispatch(updateDictionary([]));
    return;
  }

  dispatch(requestDictionary());

  try {
    const response = await service.fetchEntityDictionary(entity);
    dispatch(updateDictionary(response));
  } catch (error) {
    console.error(error);
    dispatch(updateDictionary([]));
  }
};
