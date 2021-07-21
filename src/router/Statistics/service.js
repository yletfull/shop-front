import api from '@/api';

const API_URL = 'api/v1/statistics';

const generateFetchList = (entity) => (params, { cancelToken }) => api
  .get(`${API_URL}/${entity}`, { params, cancelToken })
  .then((data) => data);

const fetchTasks = generateFetchList('tasks');
const fetchСampaigns = generateFetchList('campaigns');
const fetchPlatforms = generateFetchList('platforms');
const fetchSites = generateFetchList('sites');
const fetchSpheres = generateFetchList('spheres');
const fetchPeriods = () => api
  .get('/api/v1/statistics/periods')
  .then((data) => data?.data?.data);

export default {
  fetchTasks,
  fetchСampaigns,
  fetchPlatforms,
  fetchSites,
  fetchSpheres,
  fetchPeriods,
};
