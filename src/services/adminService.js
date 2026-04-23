import api from './api';

export const adminService = {
  
  // Notice: We removed /admin from the start of the URL!
  getMe: async () => {
    const response = await api.get('/me');
    return response.data;
  },

  // Notice: We removed /admin from the start of the URL!
  updateProfile: async (formData) => {
    const response = await api.post('/update-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};