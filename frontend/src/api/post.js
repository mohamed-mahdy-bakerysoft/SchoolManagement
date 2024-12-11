// src/utils/api/post.js
import apiInstance from './apiInstance';

// Generic POST request
export const post = (url, data) => {
  return apiInstance.post(url, data);
};
