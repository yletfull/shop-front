import { createAction } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';

export const requestData = createAction(`${NS}/request`);
export const updateData = createAction(`${NS}/update`);
