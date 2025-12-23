import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import InquiryService from '../services/inquiry.service';

export const useInquiries = () => {
    return useQuery({
        queryKey: ['inquiries'],
        queryFn: () => InquiryService.getAll(),
    });
};

export const useCreateInquiry = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => InquiryService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inquiries'] });
        },
    });
};

export const useMarkInquiryAsRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, isRead }) => InquiryService.markAsRead(id, isRead),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inquiries'] });
        },
    });
};

export const useDeleteInquiry = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => InquiryService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inquiries'] });
        },
    });
};
