import api from './api';

export const userService = {
  
  // 1. Get all users (PDF says: GET /admin/users)
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  // Get a specific user by ID (PDF says: GET /admin/users/{user_id})
  getUserDetails: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  // Get dashboard overview metrics (PDF says: GET /admin/overview)
  getOverview: async () => {
    const response = await api.get('/admin/overview');
    return response.data;
  },
  
  // 2. Update a user's status (PDF says: PUT /admin/users/{id}/status)
  updateStatus: async (userId, newStatus) => {
    const response = await api.put(`/admin/users/${userId}/status`, { 
      status: newStatus 
    });
    return response.data;
  }

  // (I removed deleteUser because it is not in their API documentation! 
  // Admins can only 'block' users via status update, not delete them.)
};