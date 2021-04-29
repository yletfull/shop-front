import { createAction } from '@reduxjs/toolkit';
import NS from './namespace';

export const stage = createAction(`${NS}/setStage`);

export const setStage = (value) => (dispatch) => {
  dispatch(stage(value));
};
