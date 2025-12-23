import api from '../lib/api';

const ProjectService = {
    getAll: async () => {
        const response = await api.get('/projects');
        return response.data.data;
    },
    getById: async (id) => {
        const response = await api.get(`/projects/${id}`);
        return response.data.data;
    },
    create: async (projectData) => {
        const response = await api.post('/projects', projectData);
        return response.data.data;
    },
    update: async (id, projectData) => {
        const response = await api.put(`/projects/${id}`, projectData);
        return response.data.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/projects/${id}`);
        return response.data.data;
    }
};

export default ProjectService;
