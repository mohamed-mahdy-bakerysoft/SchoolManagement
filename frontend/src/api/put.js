// src/utils/api/put.js
import apiInstance from './apiInstance';

// Generic PUT request
export const put = (url, data) => {
  return apiInstance.put(url, data);
};
