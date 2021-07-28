import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';
import service from './service';

export const requestDynamics = createAction(`${NS}/request/dynamics`);
export const requestEntities = createAction(`${NS}/request/entities`);
export const requestPeriods = (
  createAction(`${NS}/request/periods`));
export const updateDynamics = createAction(`${NS}/update/dynamics`);
export const updateEntities = createAction(`${NS}/update/entities`);
export const updatePeriods = (
  createAction(`${NS}/update/periods`));

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
    dispatch(updateEntities([]));
    console.error(error);
  }
};

export const fetchEntityDynamics = (entity, id, params) => async (dispatch) => {
  const { dateStart, dateEnd } = params || {};

  if (!entity || !id || !dateStart || !dateEnd) {
    dispatch(updateDynamics({}));
    return;
  }

  dispatch(requestDynamics());

  try {
    const { data, meta } = await service.fetchEntityDynamics(
      entity,
      id,
      { dateStart, dateEnd },
    );
    dispatch(updateDynamics({ data, meta }));
  } catch (error) {
    dispatch(updateDynamics({}));
    console.error(error);
  }
};

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
