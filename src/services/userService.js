import api from './api';

// This file holds all the specific calls for Users
export const userService = {
  
  // Get all users
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Delete a user
  deleteUser: async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },

  // Update a user's status
  updateStatus: async (userId, newStatus) => {
    const response = await api.patch(`/users/${userId}/status`, { status: newStatus });
    return response.data;
  }
};