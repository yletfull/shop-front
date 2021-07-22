import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';

export const requestAttributes = createAction(`${NS}/request/attributes`);
export const requestSegments = createAction(`${NS}/request/attributes`);
export const updateAttributes = createAction(`${NS}/update/attributes`);
export const updateSegments = createAction(`${NS}/update/attributes`);
