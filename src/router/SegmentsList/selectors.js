import { namespace as NS } from './constants';

export const getData = (state) => state[NS]?.data || [];
export const getIsFetchingData = (state) => state[NS]?.isFetching || false;
