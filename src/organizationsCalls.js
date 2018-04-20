import API from './api';
import appendAuthorizationHeaders from './appendAuthorizationHeaders';

const getOrganizations = () => API.get('organizations').then(response => response.data);

const addOrganization = organization =>
  API.post('organizations', organization, { headers: appendAuthorizationHeaders() }).then(res => res.data);

const getPendingOrganizations = () =>
  API.get('organizations/pending', { headers: appendAuthorizationHeaders() }).then(response => response.data);

const acceptPendingOrganizations = id =>
  API.put(`organizations/${id}`, {}, { headers: appendAuthorizationHeaders() }).then(res => res.data);

const deleteOrganization = id =>
  API.delete(`organizations/${id}`, { headers: appendAuthorizationHeaders() }).then(res => res.data);

export {
  getOrganizations,
  addOrganization,
  getPendingOrganizations,
  acceptPendingOrganizations,
  deleteOrganization,
};
