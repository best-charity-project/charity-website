import API from './api';
import appendAuthorizationHeaders from './appendAuthorizationHeaders';

const authHeader = appendAuthorizationHeaders();

const getOrganizations = () => API.get('organizations').then(response => response.data);

const addOrganization = (organization) => {
  API.post('organizations', organization, { headers: authHeader });
};

export { getOrganizations, addOrganization };
