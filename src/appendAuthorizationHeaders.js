import { getToken } from './Auth/Auth';

export default (headers) => {
  const newHeaders = headers || {};
  newHeaders.Authorization = `Bearer ${getToken()}`;
  return newHeaders;
};
