import { createSelector } from '@reduxjs/toolkit';
import { namespace as NS } from './constants';

export const getIsFetchingPeriods = (state) => (
  state[NS]?.isFetchingPeriods || false);
export const getPeriods = (state) => (
  state[NS]?.periods || []);

export const getAvailablePeriods = createSelector(
  [getPeriods],
  (periods) => {
    const {
      datestart: dateStart,
      dateend: dateEnd,
    } = periods[0] || {};
    return ({
      dateStart,
      dateEnd,
    });
  },
);
