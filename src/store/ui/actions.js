/* eslint-disable import/prefer-default-export */
import { createAction } from '@reduxjs/toolkit';
import NS from './namespace';

export const setHeader = createAction(`${NS}/setHeader`);
