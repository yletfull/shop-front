import api from '@/api';

const baseUrl = 'api/v1/statistics';

const fetchReactionsComments = function serviceFetchReactionsComments({
  entityType,
  entityId,
  params,
}) {
  if (!entityType || !entityId) {
    return;
  }

  const entity = encodeURIComponent(entityType);
  const id = encodeURIComponent(entityId);

  return api
    .get(`${baseUrl}/${entity}/${id}/reactions/commentsAndReposts`, { params })
    .then((response) => response.data.data);
};

const fetchReactionsTotal = function serviceFetchReactionsTotal({
  entityType,
  entityId,
  params,
}) {
  if (!entityType || !entityId) {
    return;
  }

  const entity = encodeURIComponent(entityType);
  const id = encodeURIComponent(entityId);

  return api
    .get(`${baseUrl}/${entity}/${id}/reactions/total`, { params })
    .then((response) => response.data.data);
};

const fetchReactionsByPlatform = function serviceFetchReactionsByPlatform({
  platformId,
  entityType,
  entityId,
  params,
}) {
  if (!entityType || !entityId) {
    return;
  }

  const entity = encodeURIComponent(entityType);
  const id = encodeURIComponent(entityId);

  return api
    .get(`${baseUrl}/${entity}/${id}/reactions/byPlatform/${platformId}`, { params })
    .then((response) => response.data.data);
};

export default {
  fetchReactionsComments,
  fetchReactionsTotal,
  fetchReactionsByPlatform,
};
