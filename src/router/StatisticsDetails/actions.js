import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';
import service from './service';

export const requestPeriods = (
  createAction(`${NS}/request/periods`));
export const updatePeriods = (
  createAction(`${NS}/update/periods`));

export const fetchPeriods = () => async (dispatch) => {
  dispatch(requestPeriods());

  try {
    const response = await service.fetchPeriods();
    dispatch(updatePeriods(response));
  } catch (error) {
    dispatch(updatePeriods([]));
    console.error(error);
  }
};
