import API from './api';
import appendAuthorizationHeaders from './appendAuthorizationHeaders';

const authHeader = appendAuthorizationHeaders();

const getEvents = (amount) => {
  let url = 'calendar';
  if (amount) {
    url = `calendar?count=${amount}`;
  }
  return API.get(url).then(response => response.data);
};

const addEvents = (event) => {
  API.post('calendar', event, { headers: authHeader });
};

export { getEvents, addEvents };
