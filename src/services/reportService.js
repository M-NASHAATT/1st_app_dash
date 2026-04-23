import api from './api';

export const reportService = {
  
  // 1. Get all reports
  getAllReports: async () => {
    const response = await api.get('/admin/reports');
    return response.data;
  },

  // 2. Update a report's status (Approve or Reject)
  updateStatus: async (reportId, newStatus, adminNote = "Status updated by admin") => {
    const response = await api.put(`/admin/reports/${reportId}/status`, { 
      status: newStatus,
      admin_note: adminNote
    });
    return response.data;
  }
};