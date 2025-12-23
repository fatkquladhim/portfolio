import api from '../lib/api';

const TechStackService = {
    getAll: async () => {
        const response = await api.get('/tech-stacks');
        return response.data.data;
    },
    create: async (data) => {
        const response = await api.post('/tech-stacks', data);
        return response.data.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/tech-stacks/${id}`, data);
        return response.data.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/tech-stacks/${id}`);
        return response.data.data;
    }
};

export default TechStackService;
