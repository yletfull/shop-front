import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';
import service from './service';

export const requestParams = createAction(`${NS}/params/request`);
export const updateParams = createAction(`${NS}/params/update`);

export const fetchParams = () => async (dispatch) => {
  dispatch(requestParams());
  try {
    const response = await service.fetchParams();
    dispatch(updateParams(response));
  } catch (error) {
    console.error(error);
    dispatch(updateParams({}));
  }
};
