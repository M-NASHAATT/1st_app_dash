import api from './api';

export const recyclingService = {
  
  // ==========================================
  // BATCHES INVENTORY (CRUD)
  // ==========================================
  getAllBatches: async () => {
    const response = await api.get('/admin/batches');
    return response.data;
  },

  getBatchById: async (batchId) => {
    const response = await api.get(`/admin/batches/${batchId}`);
    return response.data;
  },

  createBatch: async (formData) => {
    // Requires multipart/form-data for the image upload!
    const response = await api.post('/admin/batches', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  
updateBatch: async (batchId, formData) => {
    // If you are sending images, Laravel needs POST and _method=PUT
    const response = await api.post(`/admin/batches/${batchId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteBatch: async (batchId) => {
    const response = await api.delete(`/admin/batches/${batchId}`);
    return response.data;
  },

  // ==========================================
  // LOGISTICS & ORDERS
  // ==========================================
  getAllOrders: async () => {
    const response = await api.get('/admin/orders');
    return response.data;
  },

  getOrderById: async (orderId) => {
    const response = await api.get(`/admin/orders/${orderId}`);
    return response.data;
  },

  // The payload here is dynamic based on the status! (e.g. carrier_assigned needs vehicle_type)
  updateOrderStatus: async (orderId, payload) => {
    const response = await api.post(`/admin/orders/${orderId}/status`, payload);
    return response.data;
  }
};
