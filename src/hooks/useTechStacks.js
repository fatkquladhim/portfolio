import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TechStackService from '../services/techStack.service';

export const useTechStacks = () => {
    return useQuery({
        queryKey: ['tech-stacks'],
        queryFn: () => TechStackService.getAll(),
    });
};

export const useCreateTechStack = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => TechStackService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tech-stacks'] });
        },
    });
};

export const useUpdateTechStack = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => TechStackService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tech-stacks'] });
        },
    });
};

export const useDeleteTechStack = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => TechStackService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tech-stacks'] });
        },
    });
};
