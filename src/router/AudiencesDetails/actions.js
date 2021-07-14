import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';
import service from './service';

export const requestAudienceDetails = createAction(`${NS}/request/audienceDetails`);
export const updateAudienceDetails = createAction(`${NS}/update/audienceDetails`);

export const fetchAudienceDetails = (id) => async (dispatch) => {
  if (typeof id === 'undefined') {
    return;
  }
  dispatch(requestAudienceDetails());
  try {
    const response = await service.fetchAudienceDetails(id);
    dispatch(updateAudienceDetails(response));
  } catch (error) {
    console.error(error);
    dispatch(updateAudienceDetails({}));
  }
};
