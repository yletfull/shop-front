import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';
import service from './service';

export const requestAudienceCompare = createAction(`${NS}/request/audienceCompare`);
export const requestAudienceDetails = createAction(`${NS}/request/audienceDetails`);
export const updateAudienceCompare = createAction(`${NS}/update/audienceCompare`);
export const updateAudienceDetails = createAction(`${NS}/update/audienceDetails`);

export const fetchAudienceCompare = (id, params) => async (dispatch) => {
  if (typeof id === 'undefined') {
    return;
  }
  dispatch(requestAudienceCompare());
  try {
    const response = await service.fetchAudienceCompare(id, params);
    dispatch(updateAudienceCompare(response));
  } catch (error) {
    console.error(error);
    dispatch(updateAudienceCompare({}));
  }
};

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
