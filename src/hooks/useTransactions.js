import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TransactionService from '../services/transaction.service';

export const useTransactions = (limit = 50) => {
    return useQuery({
        queryKey: ['transactions', { limit }],
        queryFn: () => TransactionService.getAll(limit),
    });
};

export const useTransactionStats = () => {
    return useQuery({
        queryKey: ['transaction-stats'],
        queryFn: () => TransactionService.getStats(),
    });
};

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTransaction) => TransactionService.create(newTransaction),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['transaction-stats'] });
        },
    });
};

export const useUpdateTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => TransactionService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['transaction-stats'] });
        },
    });
};

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => TransactionService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['transaction-stats'] });
        },
    });
};
