// src/utils/api/delete.js
import apiInstance from './apiInstance';

// Generic DELETE request
export const deleteRequest = (url) => {
  return apiInstance.delete(url);
};
