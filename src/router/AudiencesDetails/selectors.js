import { namespace as NS } from './constants';

export const getIsFetchingAudienceDetails = (state) => (
  state[NS]?.isFetchingAudienceDetails);
export const getAudienceDetails = (state) => (
  state[NS]?.audienceDetails || {});
