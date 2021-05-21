import api from '@/api';

const fetchAccountsList = () => api.get('api/v1/ad-cabinets')
  .then((data) => data);

const setAccount = ({ cabinetId }) => api.patch(`api/v1/ad-cabinet/${cabinetId}`)
  .then((data) => data);

const fetchClientsList = ({ cabinetId }) => api.get(`api/v1/ad-cabinet/${cabinetId}/clients`)
  .then((data) => data);

const fetchDocuments = () => api.get('api/v1/documents')
  .then((data) => data);

const fetchDocumentDetails = ({ documentId }) => api.get(`api/v1/document/${documentId}`)
  .then((data) => data);

const fetchQueueList = ({ cabinetId, ...params }) => api
  .get(`api/v1/ad-cabinet/${cabinetId}/queue`, { params })
  .then((data) => data);

const uploadFiles = ({ files }) => api.post('api/v1/documents', files)
  .then((data) => data);

const acceptFile = (params) => api.post('api/v1/import', { ...params })
  .then((data) => data);

export default {
  fetchAccountsList,
  setAccount,
  fetchClientsList,
  fetchQueueList,
  fetchDocuments,
  fetchDocumentDetails,
  uploadFiles,
  acceptFile,
};
