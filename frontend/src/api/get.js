// src/utils/api/get.js
import apiInstance from './apiInstance';

// Generic GET request
export const get = (url, params = {}) => {
  return apiInstance.get(url, { params });
};
