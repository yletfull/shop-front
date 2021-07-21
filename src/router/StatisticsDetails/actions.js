import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';
import service from './service';

export const requestDynamics = createAction(`${NS}/request/dynamics`);
export const requestEntities = createAction(`${NS}/request/entities`);
export const requestReactionsTonality = (
  createAction(`${NS}/request/reactions/tonality`));
export const updateDynamics = createAction(`${NS}/update/dynamics`);
export const updateEntities = createAction(`${NS}/update/entities`);
export const updateReactionsTonality = (
  createAction(`${NS}/update/reactions/tonality`));

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

export const fetchReactionsTonality = (entity, id, params) => (
  async (dispatch) => {
    const { dateStart, dateEnd } = params || {};

    if (!entity || !id || !dateStart || !dateEnd) {
      dispatch(updateReactionsTonality({}));
      return;
    }

    dispatch(requestReactionsTonality());

    try {
      const { data, meta } = await service.fetchReactionsTonality(
        entity,
        id,
        { dateStart, dateEnd },
      );
      dispatch(updateReactionsTonality({ data, meta }));
    } catch (error) {
      dispatch(updateReactionsTonality({}));
      console.error(error);
    }
  });
