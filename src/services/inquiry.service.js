import api from '../lib/api';

const InquiryService = {
    getAll: async () => {
        const response = await api.get('/inquiries');
        return response.data.data;
    },
    create: async (data) => {
        const response = await api.post('/inquiries', data);
        return response.data.data;
    },
    markAsRead: async (id, isRead = true) => {
        const response = await api.patch(`/inquiries/${id}/read`, { isRead });
        return response.data.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/inquiries/${id}`);
        return response.data.data;
    }
};

export default InquiryService;
