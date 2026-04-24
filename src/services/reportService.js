import api from './api';

export const reportService = {
  
  getAllReports: async () => {
    const response = await api.get('/admin/reports');
    return response.data;
  },

  // NEW: Get a single report by ID
  getReportById: async (reportId) => {
    const response = await api.get(`/admin/reports/${reportId}`);
    return response.data;
  },

  updateStatus: async (reportId, newStatus, adminNote = "") => {
    const response = await api.put(`/admin/reports/${reportId}/status`, { 
      status: newStatus,
      admin_note: adminNote
    });
    return response.data;
  }
};