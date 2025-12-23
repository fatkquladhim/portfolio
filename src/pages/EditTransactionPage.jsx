
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useTransactions, useUpdateTransaction } from '../hooks/useTransactions'
import { useCategories } from '../hooks/useCategories'
import toast from 'react-hot-toast'

function EditTransactionPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: transactions } = useTransactions()
    const { data: categories } = useCategories()
    const { mutate: updateTransaction, isLoading: isUpdating } = useUpdateTransaction()

    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        type: 'expense',
        categoryId: '',
        date: '',
        description: ''
    })

    useEffect(() => {
        const tx = transactions?.find(t => t.id === parseInt(id))
        if (tx) {
            setFormData({
                name: tx.name || '',
                amount: tx.amount || '',
                type: tx.type || 'expense',
                categoryId: tx.categoryId || '',
                date: tx.date ? new Date(tx.date).toISOString().split('T')[0] : '',
                description: tx.description || ''
            })
        }
    }, [id, transactions])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.name || !formData.amount || !formData.categoryId) {
            return toast.error('Please fill in all required fields')
        }

        updateTransaction({ id: parseInt(id), data: formData }, {
            onSuccess: () => {
                toast.success('Transaction updated successfully!')
                navigate('/report')
            },
            onError: (error) => {
                toast.error(error.response?.data?.error || 'Failed to update transaction')
            }
        })
    }

    return (
        <div className="bg-background-dark text-white font-body min-h-screen flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6 md:p-10">
                <div className="max-w-3xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-display font-bold">Edit Transaction</h1>
                        <p className="text-[#92c9c0]">Update your transaction details below.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#92c9c0]">Transaction Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-[#11221f]/50 border border-[#234842] rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all"
                                placeholder="e.g. AWS Subscription"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-[#92c9c0]">Amount ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    className="bg-[#11221f]/50 border border-[#234842] rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all"
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-[#92c9c0]">Transaction Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="bg-[#11221f]/50 border border-[#234842] rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all"
                                >
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-[#92c9c0]">Category</label>
                                <select
                                    value={formData.categoryId}
                                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                    className="bg-[#11221f]/50 border border-[#234842] rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all"
                                    required
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categories?.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-[#92c9c0]">Date</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="bg-[#11221f]/50 border border-[#234842] rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all [color-scheme:dark]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#92c9c0]">Description (Optional)</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="bg-[#11221f]/50 border border-[#234842] rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all min-h-[100px]"
                                placeholder="Add some notes..."
                            />
                        </div>

                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/report')}
                                className="px-6 py-3 rounded-xl border border-[#234842] text-[#92c9c0] hover:text-white transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="bg-primary hover:bg-emerald-400 text-[#11221f] px-10 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
                            >
                                {isUpdating ? 'Updating...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default EditTransactionPage
