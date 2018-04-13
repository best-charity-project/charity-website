import API from './api';
import appendAuthorizationHeaders from './appendAuthorizationHeaders';

const authHeader = appendAuthorizationHeaders();

const getOrganizations = () => API.get('organizations').then(response => response.data);

const addOrganization = (organization) => {
  API.post('organizations', organization, { headers: authHeader });
};

const getPendingOrganizations = () =>
  API.get('organizations/pending').then(response => response.data);

const acceptPendingOrganizations = id =>
  API.put(`organizations/${id}`, {}, { headers: authHeader }).then(res => res.data);

const deleteOrganization = id =>
  API.delete(`organizations/${id}`, { headers: authHeader }).then(res => res.data);

export {
  getOrganizations,
  addOrganization,
  getPendingOrganizations,
  acceptPendingOrganizations,
  deleteOrganization,
};
