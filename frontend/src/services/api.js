import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Form APIs
export const formAPI = {
  createForm: (formData) => api.post('/forms', formData),
  getForm: (id) => api.get(`/forms/${id}`),
  updateForm: (id, formData) => api.put(`/forms/${id}`, formData),
  getAllForms: () => api.get('/forms'),
  deleteForm: (id) => api.delete(`/forms/${id}`),
};

// Response APIs
export const responseAPI = {
  submitResponse: (responseData) => api.post('/responses', responseData),
  getFormResponses: (formId) => api.get(`/responses/${formId}`),
  getResponseCount: (formId) => api.get(`/responses/${formId}/count`),
};

export default api;
