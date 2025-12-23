import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { useCreateTransaction } from '../hooks/useTransactions';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';

function AddTransactionPage() {
    const navigate = useNavigate();
    const { data: categories, isLoading: catsLoading } = useCategories();
    const { mutate: createTransaction, isLoading: isCreating } = useCreateTransaction();

    const [transactionType, setTransactionType] = useState('expense');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return toast.error('Transaction name is required');
        if (!amount) return toast.error('Amount is required');
        if (!categoryId) return toast.error('Please select a category');

        const payload = {
            name,
            amount: parseFloat(amount),
            type: transactionType,
            date,
            categoryId: parseInt(categoryId, 10),
            description,
        };

        createTransaction(payload, {
            onSuccess: () => {
                toast.success('Transaction saved!');
                navigate('/dashboard');
            },
            onError: (error) => {
                toast.error(error.response?.data?.error || 'Failed to save transaction');
            },
        });
    };

    return (
        <div className="bg-background-dark font-body antialiased overflow-hidden">
            <div className="flex h-screen w-full overflow-hidden">
                {/* Sidebar */}
                <Sidebar />

                {/* Modal Card with Glow & Glass Effect */}
                <div className="w-full max-w-lg mx-auto my-8 px-6 relative z-10">
                    <div className="bg-[#132320]/90 backdrop-blur-xl border border-[#1f3b36] rounded-2xl p-8 shadow-2xl shadow-primary/10">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-white text-2xl font-display font-bold">Add Transaction</h1>
                            <Link to="/dashboard" className="text-[#92c9c0] hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[24px]">close</span>
                            </Link>
                        </div>

                        {/* Type Toggle */}
                        <div className="flex bg-[#0d1b19] rounded-lg p-1 mb-6 border border-[#1f3b36]">
                            <button
                                type="button"
                                onClick={() => setTransactionType('income')}
                                className={`flex-1 py-3 rounded-md text-sm font-bold transition-all ${transactionType === 'income'
                                        ? 'bg-primary text-[#0d1b19] shadow-[0_0_15px_rgba(19,236,200,0.3)]'
                                        : 'text-[#92c9c0] hover:text-white'
                                    }`}
                            >
                                Income
                            </button>
                            <button
                                type="button"
                                onClick={() => setTransactionType('expense')}
                                className={`flex-1 py-3 rounded-md text-sm font-bold transition-all ${transactionType === 'expense'
                                        ? 'bg-primary text-[#0d1b19] shadow-[0_0_15px_rgba(19,236,200,0.3)]'
                                        : 'text-[#92c9c0] hover:text-white'
                                    }`}
                            >
                                Expense
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Amount - Bigger & Glowing */}
                            <div className="text-center">
                                <label className="block text-[#92c9c0] text-sm font-medium mb-2">Amount</label>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-[#92c9c0] text-3xl font-display">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="bg-transparent text-white text-5xl font-display font-bold text-center w-48 focus:outline-none placeholder-[#3a5a54] border-b-2 border-primary/50 focus:border-primary transition-colors shadow-[0_0_10px_rgba(19,236,200,0.2)]"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-[#92c9c0] text-sm font-medium mb-2">Transaction Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. AWS Subscription"
                                    className="w-full bg-[#0d1b19] border border-[#1f3b36] rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-primary/50 focus:shadow-[0_0_10px_rgba(19,236,200,0.1)] transition-shadow"
                                    required
                                />
                            </div>

                            {/* Date & Category Row */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Date */}
                                <div>
                                    <label className="block text-[#92c9c0] text-sm font-medium mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full bg-[#0d1b19] border border-[#1f3b36] rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-primary/50 [color-scheme:dark] focus:shadow-[0_0_10px_rgba(19,236,200,0.1)] transition-shadow"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-[#92c9c0] text-sm font-medium mb-2">Category</label>
                                    <div className="relative">
                                        <select
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(e.target.value)}
                                            className="w-full bg-[#0d1b19] border border-[#1f3b36] rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-primary/50 appearance-none cursor-pointer focus:shadow-[0_0_10px_rgba(19,236,200,0.1)] transition-shadow"
                                            required
                                        >
                                            <option value="">
                                                {catsLoading ? 'Loading...' : 'Select category'}
                                            </option>
                                            {categories?.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#92c9c0] pointer-events-none text-[20px]">
                                            expand_more
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-[#92c9c0] text-sm font-medium mb-2">Description (Optional)</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="What was this for?"
                                    rows={2}
                                    className="w-full bg-[#0d1b19] border border-[#1f3b36] rounded-lg py-3 px-4 text-white text-sm placeholder-[#5a7d76] focus:outline-none focus:border-primary/50 resize-none focus:shadow-[0_0_10px_rgba(19,236,200,0.1)] transition-shadow"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 pt-6">
                                <Link
                                    to="/dashboard"
                                    className="flex-1 py-3.5 rounded-lg border border-[#1f3b36] text-[#92c9c0] text-sm font-bold hover:bg-white/5 hover:text-white transition-all text-center"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="flex-1 py-3.5 rounded-lg bg-primary hover:bg-primary-hover text-[#0d1b19] text-sm font-bold shadow-[0_0_20px_rgba(19,236,200,0.3)] hover:shadow-[0_0_25px_rgba(19,236,200,0.5)] transition-all disabled:opacity-50"
                                >
                                    {isCreating ? 'Saving...' : 'Save Transaction'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTransactionPage;