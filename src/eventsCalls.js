import API from './api';
import appendAuthorizationHeaders from './appendAuthorizationHeaders';

const authHeader = appendAuthorizationHeaders();

const getEvents = () => API.get('calendar').then(response => response.data);

const addEvents = (event) => {
  API.post('calendar', event, { headers: authHeader });
};

export { getEvents, addEvents };
