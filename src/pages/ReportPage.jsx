import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    useTransactions,
    useTransactionStats,
    useDeleteTransaction,
} from '../hooks/useTransactions';
import toast from 'react-hot-toast';
import { useSession, signOut } from '../lib/auth-client';
import Sidebar from '../components/Sidebar';
import AIAssistantPanel from '../components/AIAssistantPanel';

function ReportPage() {
    const navigate = useNavigate();
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState('');
    const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(true);
    const [isAIFull, setIsAIFull] = useState(true); // true = expanded
    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const { data: transactions = [], isLoading: txLoading } = useTransactions(1000);
    const { data: stats = {}, isLoading: statsLoading } = useTransactionStats();
    const deleteMutation = useDeleteTransaction();

    // === AI Assistant Handlers ===
    const toggleAIAssistant = () => {
        if (!isAIAssistantOpen) {
            setIsAIAssistantOpen(true);
            setIsAIFull(true);
        } else {
            setIsAIFull((prev) => !prev);
        }
    };

    const closeAIAssistant = () => {
        setIsAIAssistantOpen(false);
        setIsAIFull(true);
    };

    // === Auth & Data Handlers ===
    const handleLogout = async () => {
        await signOut({ fetchOptions: { onSuccess: () => navigate('/login') } });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this transaction?')) return;
        try {
            await deleteMutation.mutateAsync(id);
            toast.success('Transaction deleted successfully');
        } catch (error) {
            toast.error('Failed to delete transaction');
        }
    };

    // === Memoized Data ===
    const filteredTransactions = useMemo(() => {
        return transactions.filter(
            (tx) =>
                tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (tx.category?.name && tx.category.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [transactions, searchQuery]);

    const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
    const paginatedTransactions = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredTransactions.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredTransactions, currentPage]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    // === Helpers ===
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const getCategoryColor = (name) => {
        const colors = {
            Income: 'text-primary border-primary/20 bg-primary/5',
            Infrastructure: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
            Software: 'text-purple-400 border-purple-400/20 bg-purple-400/5',
            Personal: 'text-orange-400 border-orange-400/20 bg-orange-400/5',
        };
        return colors[name] || 'text-[#92c9c0] border-[#92c9c0]/20 bg-[#92c9c0]/5';
    };

    const netSavings = (stats.monthlyIncome || 0) - (stats.monthlyExpense || 0);

    return (
        <div className="bg-background-dark font-body antialiased overflow-hidden">
            <div className="flex h-screen w-full overflow-hidden">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-2 lg:p-2 flex flex-col gap-8">
                    {/* Header */}
                    <header className="flex items-center justify-between px-6 py-5 shrink-0 bg-background-dark/80 backdrop-blur-sm z-10 sticky top-0">
                        <div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">
                                Welcome back, {session?.user?.name || 'Adhim'}!
                            </h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleAIAssistant}
                                className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors hidden xl:flex"
                                aria-label={
                                    isAIAssistantOpen
                                        ? isAIFull
                                            ? 'Minimize AI'
                                            : 'Expand AI'
                                        : 'Open AI Assistant'
                                }
                            >
                                <span className="material-symbols-outlined">
                                    {isAIAssistantOpen ? 'view_sidebar' : 'smart_toy'}
                                </span>
                            </button>
                            <button className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors md:hidden">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                        </div>
                    </header>
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                        {/* Page Heading */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-white text-4xl font-display font-bold leading-tight tracking-tight">
                                    Transaction Report
                                </h1>
                                <p className="text-[#92c9c0] text-base max-w-2xl">
                                    Generate detailed insights from your financial history, track your cash flow trends, and manage your budget effectively.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#92c9c0] bg-[#234842]/30 px-3 py-1.5 rounded-full border border-[#234842]">
                                <span className="material-symbols-outlined text-[16px]">update</span>
                                Last updated: Just now
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="glass-panel p-4 rounded-xl flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                                {/* Calendar, Type, Category filters — unchanged */}
                                {['Last 30 Days', 'Type: All', 'Category: All'].map((label, idx) => (
                                    <button
                                        key={idx}
                                        className="flex h-10 items-center gap-2 rounded-lg bg-[#234842]/40 hover:bg-[#234842]/80 border border-white/5 pl-3 pr-4 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-primary text-[20px]">
                                            {idx === 0 ? 'calendar_month' : idx === 1 ? 'tune' : 'category'}
                                        </span>
                                        <span className="text-white text-sm font-medium">{label}</span>
                                        <span className="material-symbols-outlined text-white/50 text-[20px]">arrow_drop_down</span>
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-3 w-full lg:w-auto justify-end">
                                <button className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#234842] text-[#92c9c0] hover:text-white hover:border-primary/50 px-4 transition-all">
                                    <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                                    <span className="text-sm font-medium">Export PDF</span>
                                </button>
                                <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary hover:bg-emerald-400 text-[#11221f] px-6 font-bold text-sm shadow-[0_0_15px_rgba(19,236,200,0.2)] transition-all">
                                    Generate
                                </button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Income */}
                            <StatCard
                                title="Total Income"
                                value={statsLoading ? '...' : formatCurrency(stats.monthlyIncome || 0)}
                                icon="account_balance_wallet"
                                color="text-white"
                                trend={stats.incomeGrowth || 0}
                                isPositive={true}
                            />
                            {/* Expense */}
                            <StatCard
                                title="Total Expenses"
                                value={statsLoading ? '...' : formatCurrency(stats.monthlyExpense || 0)}
                                icon="credit_card"
                                color="text-white"
                                trend={stats.expenseGrowth || 0}
                                isPositive={false}
                            />
                            {/* Net Savings */}
                            <StatCard
                                title="Net Savings"
                                value={statsLoading ? '...' : formatCurrency(netSavings)}
                                icon="savings"
                                color="text-primary"
                                trend={stats.incomeGrowth || 0}
                                isPositive={true}
                                isSavings
                            />
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Chart */}
                            <div className="glass-panel rounded-xl p-6 lg:col-span-2 flex flex-col gap-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-white font-display font-bold text-lg">Cash Flow Summary</h3>
                                        <p className="text-[#92c9c0] text-sm">Income vs Expenses breakdown</p>
                                    </div>
                                </div>
                                <div className="flex-1 min-h-[240px] flex items-center justify-center p-4">
                                    {!statsLoading && stats.trends ? (
                                        <div className="w-full flex items-end justify-between gap-4 h-full pt-10">
                                            {stats.trends.map((t, i) => (
                                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                                    <div className="w-full bg-primary/20 rounded-t h-40 relative overflow-hidden group-hover:bg-primary/30 transition-all">
                                                        <div
                                                            className="absolute bottom-0 left-0 right-0 bg-primary/60"
                                                            style={{ height: `${(t.amount / 3000) * 100}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] text-slate-500">{t.month}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-slate-500">Loading trends...</p>
                                    )}
                                </div>
                            </div>

                            {/* Performance */}
                            <div className="glass-panel rounded-xl p-6 flex flex-col h-full">
                                <h3 className="text-white font-display font-bold text-lg mb-6">Site Performance</h3>
                                <div className="flex flex-col gap-5 flex-1 justify-center">
                                    {[
                                        { label: 'Profile Views', value: stats.performance?.profileViews || 0, width: '70%' },
                                        { label: 'New Inquiries', value: stats.performance?.newInquiries || 0, width: '40%' },
                                        { label: 'Project Clicks', value: stats.performance?.projectClicks || 0, width: '55%' },
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-white font-medium">{item.label}</span>
                                                <span className="text-[#92c9c0] font-bold">{item.value}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-[#234842] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary rounded-full"
                                                    style={{ width: item.width }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Transaction Table */}
                        <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                <h3 className="text-white font-display font-bold text-lg">Transaction History</h3>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-2.5 top-2 text-white/40 text-[18px]">
                                        search
                                    </span>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-[#11221f]/50 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-primary/50 w-48 md:w-64 transition-all"
                                        placeholder="Search transactions..."
                                    />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5 border-b border-white/5 text-xs uppercase tracking-wider text-[#92c9c0]">
                                            <th className="p-4 font-semibold">Date</th>
                                            <th className="p-4 font-semibold">Name</th>
                                            <th className="p-4 font-semibold">Category</th>
                                            <th className="p-4 font-semibold">Type</th>
                                            <th className="p-4 font-semibold text-right">Amount</th>
                                            <th className="p-4 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {txLoading ? (
                                            <tr>
                                                <td colSpan={6} className="p-10 text-center text-slate-500">
                                                    Loading transactions...
                                                </td>
                                            </tr>
                                        ) : paginatedTransactions.length > 0 ? (
                                            paginatedTransactions.map((tx) => (
                                                <tr
                                                    key={tx.id}
                                                    className="group hover:bg-white/[0.02] border-b border-white/5 transition-colors"
                                                >
                                                    <td className="p-4 text-white/60">
                                                        {new Date(tx.date).toLocaleDateString()}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-white font-medium">{tx.name}</span>
                                                            {tx.description && (
                                                                <span className="text-white/40 text-xs truncate max-w-[200px]">
                                                                    {tx.description}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        {tx.category?.name ? (
                                                            <span
                                                                className={`px-2.5 py-1 rounded text-xs font-medium border ${getCategoryColor(
                                                                    tx.category.name
                                                                )}`}
                                                            >
                                                                {tx.category.name}
                                                            </span>
                                                        ) : (
                                                            <span className="text-white/40">—</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4">
                                                        <span
                                                            className={`text-xs font-medium ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                                                                }`}
                                                        >
                                                            {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td
                                                        className={`p-4 text-right font-bold ${tx.type === 'income' ? 'text-primary' : 'text-white'
                                                            }`}
                                                    >
                                                        {tx.type === 'income' ? '+' : '-'}
                                                        {formatCurrency(tx.amount)}
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link
                                                                to={`/transaction/edit/${tx.id}`}
                                                                className="p-1.5 rounded-lg hover:bg-[#234842] text-white/40 hover:text-white transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(tx.id)}
                                                                className="p-1.5 rounded-lg hover:bg-rose-500/20 text-white/40 hover:text-rose-400 transition-colors"
                                                            >
                                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="p-10 text-center text-slate-500">
                                                    No transactions found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {!txLoading && totalPages > 1 && (
                                <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm">
                                    <button
                                        onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 rounded border border-white/10 text-white/60 hover:text-white disabled:opacity-30"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-white/80">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 rounded border border-white/10 text-white/60 hover:text-white disabled:opacity-30"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* AI Assistant Panels */}
                {isAIAssistantOpen && isAIFull && (
                    <AIAssistantPanel
                        isOpen={isAIFull}
                        onClose={closeAIAssistant}
                        onToggle={toggleAIAssistant}
                    />
                )}
                {isAIAssistantOpen && !isAIFull && (
                    <div className="hidden xl:flex flex-col w-12 h-full border-l border-white/5 bg-[#13161c] shrink-0 relative z-20 items-center pt-5">
                        <button
                            onClick={toggleAIAssistant}
                            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white mb-4"
                            aria-label="Expand AI Assistant"
                        >
                            <span className="material-symbols-outlined text-lg">chevron_right</span>
                        </button>
                        <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-auto mb-4">
                            <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// === Reusable Stat Card Component ===
function StatCard({ title, value, icon, color, trend, isPositive, isSavings = false }) {
    return (
        <div className={`glass-panel rounded-xl p-6 relative overflow-hidden group ${isSavings ? 'border-primary/30 shadow-[0_4px_20px_rgba(19,236,200,0.05)]' : ''}`}>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-white text-[64px]">{icon}</span>
            </div>
            <div className="flex flex-col gap-1 relative z-10">
                <p className="text-[#92c9c0] text-sm font-medium uppercase tracking-wider">{title}</p>
                <p className={`text-3xl font-display font-bold tracking-tight ${color}`}>{value}</p>
                <div className="flex items-center gap-1 mt-2">
                    <span
                        className={`text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1 ${isPositive
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/20 text-rose-400'
                            }`}
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            {isPositive ? 'trending_up' : 'trending_down'}
                        </span>
                        {Math.abs(trend)}%
                    </span>
                    <span className="text-white/40 text-xs">vs last period</span>
                </div>
            </div>
        </div>
    );
}

export default ReportPage;