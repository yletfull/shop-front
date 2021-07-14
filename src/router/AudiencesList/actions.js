import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';
import service from './service';

export const requestAudiencesList = createAction(`${NS}/request`);
export const updateAudiencesList = createAction(`${NS}/update`);

export const fetchAudiencesList = () => async (dispatch) => {
  dispatch(requestAudiencesList());
  try {
    const response = await service.fetchAudiencesList();
    dispatch(updateAudiencesList(response));
  } catch (error) {
    console.error(error);
    dispatch(updateAudiencesList([]));
  }
};
