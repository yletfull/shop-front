import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';
import service from './service';

export const requestData = createAction(`${NS}/request`);
export const updateData = createAction(`${NS}/update`);

export const fetchData = () => async (dispatch) => {
  dispatch(requestData());
  try {
    const response = await service.fetchData();
    dispatch(updateData(response));
  } catch (error) {
    console.error(error);
    dispatch(updateData({}));
  }
};
