import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ProjectService from '../services/project.service';

export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: () => ProjectService.getAll(),
    });
};

export const useProject = (id) => {
    return useQuery({
        queryKey: ['projects', id],
        queryFn: () => ProjectService.getById(id),
        enabled: !!id,
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (projectData) => ProjectService.create(projectData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, projectData }) => ProjectService.update(id, projectData),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            queryClient.invalidateQueries({ queryKey: ['projects', id] });
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => ProjectService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
    });
};
