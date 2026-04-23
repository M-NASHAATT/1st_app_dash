import api from './api';

export const rewardService = {
  
  // 1. Get all rewards
  // PDF: GET /admin/rewards
  getAllRewards: async () => {
    const response = await api.get('/admin/rewards');
    return response.data;
  },

  // 2. Get a single reward by ID
  // PDF: GET /admin/rewards/{id}
  getRewardById: async (rewardId) => {
    const response = await api.get(`/admin/rewards/${rewardId}`);
    return response.data;
  },

  // 3. Create a new reward
  // PDF: POST /admin/rewards
  createReward: async (formData) => {
    // We MUST use multipart/form-data here because we are uploading an Image File!
    const response = await api.post('/admin/rewards', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 4. Update a reward (Status or Stock)
  // PDF: PUT /admin/rewards/{id}
  updateReward: async (rewardId, data) => {
    // Note: If you ever update the image, Laravel requires you to use POST and add _method='PUT'
    // But for just updating stock or status, a standard PUT is fine.
    const response = await api.put(`/admin/rewards/${rewardId}`, data);
    return response.data;
  },

  // 5. Delete a reward
  // PDF: DELETE /admin/rewards/{id}
  deleteReward: async (rewardId) => {
    const response = await api.delete(`/admin/rewards/${rewardId}`);
    return response.data;
  }
};