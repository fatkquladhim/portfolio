import api from '../lib/api';

const TransactionService = {
    getAll: async (limit) => {
        const response = await api.get('/transactions', { params: { limit } });
        return response.data.data;
    },
    getStats: async () => {
        const response = await api.get('/transactions/stats');
        return response.data.data;
    },
    create: async (transactionData) => {
        const response = await api.post('/transactions', transactionData);
        return response.data.data;
    },
    update: async (id, transactionData) => {
        const response = await api.put(`/transactions/${id}`, transactionData);
        return response.data.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/transactions/${id}`);
        return response.data.data;
    }
};

export default TransactionService;
