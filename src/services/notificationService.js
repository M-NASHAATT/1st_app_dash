import api from './api';

export const notificationService = {
  
  // 1. Get all notifications
  getNotifications: async () => {
    const response = await api.get('/admin/notifications');
    return response.data;
  },

  // 2. Mark a specific notification as Read
  markAsRead: async (id) => {
    const response = await api.post(`/admin/notifications/${id}/read`);
    return response.data;
  },

  // 3. Mark ALL notifications as Read
  markAllAsRead: async () => {
    const response = await api.post('/admin/notifications/mark-all-read');
    return response.data;
  },

  // 4. Delete a specific notification entirely
  clearNotification: async (id) => {
    const response = await api.delete(`/admin/notifications/${id}`);
    return response.data;
  },

  // 5. Delete ALL notifications entirely
  clearAll: async () => {
    const response = await api.delete('/admin/notifications');
    return response.data;
  }
};