// src/pages/DashboardPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AIAssistantPanel from '../components/AIAssistantPanel'; // ← Tambahkan ini
import { useTransactions, useTransactionStats } from '../hooks/useTransactions';
import { useSession } from '../lib/auth-client';

function DashboardPage() {
    const { session } = useSession();
    const { stats, isLoading: statsLoading } = useTransactionStats();
    const { recentTransactions, isLoading: txLoading } = useTransactions(4);

    // ✅ State untuk AI Panel
    const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(true);
    const [isAIFull, setIsAIFull] = useState(true); // true = expanded, false = minimized

    const toggleAIAssistant = () => {
        if (!isAIAssistantOpen) {
            setIsAIAssistantOpen(true);
            setIsAIFull(true);
        } else {
            setIsAIFull(!isAIFull);
        }
    };

    const closeAIAssistant = () => {
        setIsAIAssistantOpen(false);
        setIsAIFull(true);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(Math.abs(amount));
    };

    return (
        <div className="bg-background-dark text-slate-200 font-body selection:bg-primary selection:text-background-dark overflow-hidden">
            <div className="flex h-screen w-full">
                {/* SIDEBAR */}
                <Sidebar />

                {/* MAIN CONTENT */}
                <main className="flex-1 flex flex-col h-full overflow-hidden relative">
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
                                aria-label={isAIAssistantOpen ? (isAIFull ? 'Minimize AI' : 'Expand AI') : 'Open AI Assistant'}
                            >
                                <span className="material-symbols-outlined">
                                    {isAIAssistantOpen
                                        ? (isAIFull ? 'view_sidebar' : 'view_sidebar')
                                        : 'smart_toy'}
                                </span>
                            </button>

                            <button className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors md:hidden">
                                <span className="material-symbols-outlined">menu</span>
                            </button>
                        </div>
                    </header>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Balance */}
                            <div className="glass-panel rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden group">
                                <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all"></div>
                                <div className="flex justify-between items-start z-10">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-slate-400 text-sm font-medium">Total Balance</p>
                                        <h3 className="text-white font-display text-3xl font-bold tracking-tight">
                                            {statsLoading ? '...' : formatCurrency(stats?.totalBalance || 0)}
                                        </h3>
                                    </div>
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">account_balance_wallet</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 z-10">
                                    <span className={`flex items-center ${stats?.incomeGrowth >= 0 ? 'text-primary' : 'text-rose-400'} text-xs font-bold bg-primary/10 px-2 py-1 rounded-full`}>
                                        <span className="material-symbols-outlined text-[14px] mr-1">
                                            {stats?.incomeGrowth >= 0 ? 'trending_up' : 'trending_down'}
                                        </span>
                                        {Math.abs(stats?.incomeGrowth || 0)}%
                                    </span>
                                    <span className="text-slate-500 text-xs">vs last month</span>
                                </div>
                            </div>

                            {/* Income */}
                            <div className="glass-panel rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden group">
                                <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all"></div>
                                <div className="flex justify-between items-start z-10">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-slate-400 text-sm font-medium">Monthly Income</p>
                                        <h3 className="text-white font-display text-3xl font-bold tracking-tight">
                                            {statsLoading ? '...' : formatCurrency(stats?.monthlyIncome || 0)}
                                        </h3>
                                    </div>
                                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                                        <span className="material-symbols-outlined">payments</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 z-10">
                                    <span className="flex items-center text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">
                                        <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span>
                                        +{stats?.incomeGrowth || 0}%
                                    </span>
                                    <span className="text-slate-500 text-xs">vs last month</span>
                                </div>
                            </div>

                            {/* Expenses */}
                            <div className="glass-panel rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden group">
                                <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-500/20 rounded-full blur-2xl group-hover:bg-rose-500/30 transition-all"></div>
                                <div className="flex justify-between items-start z-10">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-slate-400 text-sm font-medium">Monthly Expenses</p>
                                        <h3 className="text-white font-display text-3xl font-bold tracking-tight">
                                            {statsLoading ? '...' : formatCurrency(stats?.monthlyExpense || 0)}
                                        </h3>
                                    </div>
                                    <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
                                        <span className="material-symbols-outlined">shopping_cart</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 z-10">
                                    <span className="flex items-center text-rose-400 text-xs font-bold bg-rose-500/10 px-2 py-1 rounded-full">
                                        <span className="material-symbols-outlined text-[14px] mr-1">trending_down</span>
                                        {stats?.expenseGrowth || 0}%
                                    </span>
                                    <span className="text-slate-500 text-xs">vs last month</span>
                                </div>
                            </div>
                        </div>

                        {/* Charts & Stats Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Chart */}
                            <div className="glass-panel rounded-xl p-6 lg:col-span-2 flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-white text-lg font-semibold">Spending Trends</h3>
                                        <p className="text-slate-500 text-sm">Overview of your monthly income</p>
                                    </div>
                                    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">more_horiz</span>
                                    </button>
                                </div>
                                <div className="flex-1 min-h-[240px] w-full relative">
                                    {statsLoading ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                                        </div>
                                    ) : (
                                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
                                            <defs>
                                                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#13ecc8" stopOpacity="0.2"></stop>
                                                    <stop offset="100%" stopColor="#13ecc8" stopOpacity="0"></stop>
                                                </linearGradient>
                                            </defs>
                                            <line stroke="rgba(255,255,255,0.05)" strokeDasharray="4" x1="0" x2="800" y1="150" y2="150"></line>
                                            <line stroke="rgba(255,255,255,0.05)" strokeDasharray="4" x1="0" x2="800" y1="100" y2="100"></line>
                                            <line stroke="rgba(255,255,255,0.05)" strokeDasharray="4" x1="0" x2="800" y1="50" y2="50"></line>
                                            <path d="M0,150 C100,150 150,80 200,80 C250,80 300,120 400,110 C500,100 550,40 650,40 C750,40 800,90 800,90 V200 H0 Z" fill="url(#chartGradient)"></path>
                                            <path d="M0,150 C100,150 150,80 200,80 C250,80 300,120 400,110 C500,100 550,40 650,40 C750,40 800,90 800,90" fill="none" stroke="#13ecc8" strokeLinecap="round" strokeWidth="3"></path>
                                            <circle cx="200" cy="80" fill="#111318" r="4" stroke="#13ecc8" strokeWidth="2"></circle>
                                            <circle cx="400" cy="110" fill="#111318" r="4" stroke="#13ecc8" strokeWidth="2"></circle>
                                            <circle className="animate-pulse" cx="650" cy="40" fill="#13ecc8" r="6"></circle>
                                        </svg>
                                    )}
                                </div>
                                <div className="flex justify-between text-xs text-slate-500 mt-4 px-2 font-display">
                                    {stats?.trends?.map(t => (
                                        <span key={t.month}>{t.month}</span>
                                    ))}
                                    {!stats?.trends && (
                                        <>
                                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Site Stats Widget */}
                            <div className="glass-panel rounded-xl p-0 flex flex-col overflow-hidden border-t-2 border-t-secondary">
                                <div className="p-6 bg-secondary/5 border-b border-white/5">
                                    <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-secondary">language</span>
                                        Site Performance
                                    </h3>
                                    <p className="text-slate-400 text-sm mt-1">Portfolio analytics this week</p>
                                </div>
                                <div className="p-6 flex flex-col gap-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                                                <span className="material-symbols-outlined">visibility</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white font-display font-bold text-lg">{stats?.performance?.profileViews || 0}</span>
                                                <span className="text-slate-500 text-xs">Profile Views</span>
                                            </div>
                                        </div>
                                        <span className="text-emerald-400 text-xs font-bold">+14%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                                                <span className="material-symbols-outlined">mark_email_unread</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white font-display font-bold text-lg">{stats?.performance?.newInquiries || 0}</span>
                                                <span className="text-slate-500 text-xs">New Inquiries</span>
                                            </div>
                                        </div>
                                        <span className="text-slate-500 text-xs">Just now</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                                                <span className="material-symbols-outlined">ads_click</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white font-display font-bold text-lg">{stats?.performance?.projectClicks || 0}</span>
                                                <span className="text-slate-500 text-xs">Project Clicks</span>
                                            </div>
                                        </div>
                                        <span className="text-emerald-400 text-xs font-bold">+2.4%</span>
                                    </div>
                                </div>
                                <div className="mt-auto p-4 bg-secondary/5 border-t border-white/5">
                                    <button className="w-full py-2 rounded-lg bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary hover:text-white transition-all">
                                        View Analytics
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Quick Actions */}
                            <div className="flex flex-col gap-4">
                                <h3 className="text-white text-lg font-semibold">Quick Actions</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                                    <Link to="/add-transaction" className="glass-panel glass-card-hover rounded-lg p-4 flex items-center gap-4 text-left group">
                                        <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined">add_circle</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">Add Transaction</h4>
                                            <p className="text-slate-500 text-xs">Log income or expense</p>
                                        </div>
                                    </Link>
                                    <Link to="/project/new" className="glass-panel glass-card-hover rounded-lg p-4 flex items-center gap-4 text-left group">
                                        <div className="size-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined">work</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">New Project</h4>
                                            <p className="text-slate-500 text-xs">Update portfolio entry</p>
                                        </div>
                                    </Link>
                                    <button className="glass-panel glass-card-hover rounded-lg p-4 flex items-center gap-4 text-left group">
                                        <div className="size-12 rounded-full bg-white/5 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined">chat</span>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">View Messages</h4>
                                            <p className="text-slate-500 text-xs">4 unread from clients</p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Recent Transactions Table */}
                            <div className="glass-panel rounded-xl p-6 lg:col-span-2 flex flex-col">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-white text-lg font-semibold">Recent Transactions</h3>
                                    <Link className="text-primary text-sm font-medium hover:underline" to="/report">View All</Link>
                                </div>
                                <div className="overflow-x-auto text-slate-100">
                                    {txLoading ? (
                                        <div className="flex justify-center py-10">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                                        </div>
                                    ) : (
                                        <table className="w-full text-left text-sm">
                                            <thead className="text-slate-500 border-b border-white/5">
                                                <tr>
                                                    <th className="pb-3 font-normal">Transaction</th>
                                                    <th className="pb-3 font-normal">Date</th>
                                                    <th className="pb-3 font-normal">Category</th>
                                                    <th className="pb-3 font-normal text-right">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-slate-300">
                                                {recentTransactions?.map((tx) => (
                                                    <tr key={tx.id} className="group hover:bg-white/5 transition-colors">
                                                        <td className="py-3 flex items-center gap-3">
                                                            <div className={`size-8 rounded-full ${tx.isIncome ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5'} flex items-center justify-center`}>
                                                                <span className="material-symbols-outlined text-[16px]">{tx.category?.icon || (tx.isIncome ? 'arrow_downward' : 'shopping_cart')}</span>
                                                            </div>
                                                            <span className="font-medium text-white">{tx.name}</span>
                                                        </td>
                                                        <td className="py-3 text-slate-500">{new Date(tx.date).toLocaleDateString()}</td>
                                                        <td className="py-3">
                                                            <span className={`px-2 py-1 rounded ${tx.isIncome ? 'bg-secondary/10 text-secondary' : 'bg-white/5'} text-xs`}>
                                                                {tx.category?.name}
                                                            </span>
                                                        </td>
                                                        <td className={`py-3 text-right font-display ${tx.isIncome ? 'text-emerald-400 font-bold' : 'text-white'}`}>
                                                            {tx.isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {(!recentTransactions || recentTransactions.length === 0) && (
                                                    <tr>
                                                        <td colSpan="4" className="py-10 text-center text-slate-500">No transactions found.</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="h-8"></div>
                    </div>
                </main>

                {/* ✅ Render AI Panel hanya jika dibutuhkan */}
                {isAIAssistantOpen && isAIFull && (
                    <AIAssistantPanel
                        isOpen={isAIFull}
                        onClose={closeAIAssistant}
                        onToggle={toggleAIAssistant}
                        title="Finance Assistant"
                        accentColor="primary"
                        mode="finance"
                        initialMessage="Hello! I'm your AI finance assistant. I've analyzed your transactions and noticed a few trends. How can I help you today?"
                    />
                )}

                {/* 🟢 Opsional: Minimized AI Bar (jika ingin versi kecil) */}
                {isAIAssistantOpen && !isAIFull && (
                    <div className="hidden xl:flex flex-col w-12 h-full border-l border-white/5 bg-[#13161c] shrink-0 relative z-20 items-center pt-5">
                        <button
                            onClick={toggleAIAssistant}
                            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors mb-4"
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

export default DashboardPage;