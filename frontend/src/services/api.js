import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URI || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

// Form APIs
export const formAPI = {
  createForm: (formData) => api.post('/forms', formData),
  getForm: (id) => api.get(`/forms/${id}`),
  getFormByToken: (token) => api.get(`/forms/public/${token}`),
  updateForm: (id, formData) => api.put(`/forms/${id}`, formData),
  getAllForms: () => api.get('/forms'),
  deleteForm: (id) => api.delete(`/forms/${id}`),
};

// Response APIs
export const responseAPI = {
  submitResponse: (responseData) => api.post('/responses', responseData),
  submitPublicResponse: (responseData) => api.post('/responses/public', responseData),
  getFormResponses: (formId) => api.get(`/responses/${formId}`),
  getResponseCount: (formId) => api.get(`/responses/${formId}/count`),
};

// Email APIs
export const emailAPI = {
  sendInvites: (data) => api.post('/email/invite', data),
};

export default api;
