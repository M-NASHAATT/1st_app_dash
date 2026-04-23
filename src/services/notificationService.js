import api from './api';

export const notificationService = {
  
  // 1. Get all notifications
  getNotifications: async () => {
    const response = await api.get('/admin/notifications');
    return response.data;
  },

  // 2. Clear a specific notification
  clearNotification: async (id) => {
    // Docs say POST /{id}/read marks it as read. 
    // If you want it completely deleted, you can change this to .delete(`/${id}`)
    const response = await api.post(`/user/notifications/${id}/read`);
    return response.data;
  },

  // 3. Clear ALL notifications
  clearAll: async () => {
    const response = await api.post('/user/notifications/mark-all-read');
    return response.data;
  }
};