import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function SettingsPage() {
    const [displayName, setDisplayName] = useState('Alex Doe')
    const [email, setEmail] = useState('alex.doe@example.com')
    const [language, setLanguage] = useState('English (US)')
    const [timezone, setTimezone] = useState('(GMT-08:00) Pacific Time')
    const [theme, setTheme] = useState('dark')
    const [twoFactor, setTwoFactor] = useState(true)
    const [weeklyDigest, setWeeklyDigest] = useState(true)
    const [transactionAlerts, setTransactionAlerts] = useState(true)
    const [marketingEmails, setMarketingEmails] = useState(false)
    const [aiPersonality, setAiPersonality] = useState(70)

    return (
        <div className="bg-background-dark text-white font-body overflow-x-hidden antialiased">
            <div className="flex h-screen w-full overflow-hidden">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                    {/* Background Gradients */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-20 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 scroll-smooth">
                        <div className="max-w-5xl mx-auto space-y-8 pb-20">
                            {/* Breadcrumbs & Heading */}
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                    <div className="space-y-2">
                                        <h2 className="text-white text-4xl font-black font-display tracking-tight">Settings</h2>
                                        <p className="text-[#92c9c0] text-base max-w-xl">Manage your profile, security, and preferences for the private finance zone.</p>
                                    </div>
                                    <button className="bg-primary text-background-dark px-6 py-2.5 rounded-lg font-bold text-sm shadow-[0_0_20px_rgba(19,236,200,0.2)] hover:shadow-[0_0_25px_rgba(19,236,200,0.4)] transition-all duration-300">
                                        Save Changes
                                    </button>
                                </div>
                            </div>

                            {/* Profile Header */}
                            <div className="glass-panel rounded-2xl p-6 md:p-8">
                                <div className="flex flex-col md:flex-row gap-6 items-center md:justify-between">
                                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                                        <div className="relative group cursor-pointer">
                                            <div
                                                className="bg-center bg-no-repeat bg-cover rounded-full h-24 w-24 border-2 border-primary/30"
                                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBj7GHFIrJsQRvlj0xIrTZJRYYN7w5l5hIljl4il4fOXoT9d0v8tm11Rbdrn1bfdOL_zIXL2msQnfx14fuQoW5UeD7PW-L-uSPsaILfW-gzANQLr0n8I-ifOe56P2h4Z6vIZnZDpUed50S4fjiXxegi9_9Q3G_IdzmXePg0M5CwZAdNu52y4H4vPzmfvMby6wFRnk47KDGPEpHcrcOYzrYKEWOHh73qF_lkIVW4HlDxF5mqenCkJafG9_U2aE0GCpF_O9XkTrjyn74")' }}
                                            ></div>
                                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="material-symbols-outlined text-white">edit</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-white text-2xl font-bold font-display">Alex Doe</h3>
                                            <p className="text-[#92c9c0]">alex.doe@example.com</p>
                                            <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                                Pro Member
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 w-full md:w-auto">
                                        <button className="flex-1 md:flex-none h-10 px-6 rounded-lg border border-[#234842] text-white font-medium hover:bg-[#234842] transition-colors">
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Main Settings Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Column: General & Security */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* General Settings */}
                                    <section className="space-y-4">
                                        <h3 className="text-white text-xl font-bold font-display border-b border-[#234842] pb-2">General</h3>
                                        <div className="glass-panel rounded-xl p-6 space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-[#92c9c0]">Display Name</label>
                                                    <input
                                                        type="text"
                                                        value={displayName}
                                                        onChange={(e) => setDisplayName(e.target.value)}
                                                        className="w-full bg-[#11221f] border border-[#234842] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-[#2f5e56]"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-[#92c9c0]">Email Address</label>
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full bg-[#11221f] border border-[#234842] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-[#2f5e56]"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-[#92c9c0]">Language</label>
                                                    <div className="relative">
                                                        <select
                                                            value={language}
                                                            onChange={(e) => setLanguage(e.target.value)}
                                                            className="w-full bg-[#11221f] border border-[#234842] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                                                        >
                                                            <option>English (US)</option>
                                                            <option>Spanish</option>
                                                            <option>French</option>
                                                        </select>
                                                        <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#92c9c0] pointer-events-none">expand_more</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-[#92c9c0]">Timezone</label>
                                                    <div className="relative">
                                                        <select
                                                            value={timezone}
                                                            onChange={(e) => setTimezone(e.target.value)}
                                                            className="w-full bg-[#11221f] border border-[#234842] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                                                        >
                                                            <option>(GMT-08:00) Pacific Time</option>
                                                            <option>(GMT+00:00) UTC</option>
                                                            <option>(GMT+01:00) Central European Time</option>
                                                        </select>
                                                        <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#92c9c0] pointer-events-none">expand_more</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-4 border-t border-[#234842] flex items-center justify-between">
                                                <div>
                                                    <p className="text-white font-medium">Appearance</p>
                                                    <p className="text-xs text-[#92c9c0]">Customize how the dashboard looks on your device.</p>
                                                </div>
                                                <div className="flex bg-[#11221f] p-1 rounded-lg border border-[#234842]">
                                                    <button
                                                        onClick={() => setTheme('dark')}
                                                        className={`px-3 py-1.5 rounded text-xs font-medium ${theme === 'dark' ? 'bg-[#234842] text-white shadow-sm' : 'text-[#92c9c0] hover:text-white'}`}
                                                    >
                                                        Dark
                                                    </button>
                                                    <button
                                                        onClick={() => setTheme('light')}
                                                        className={`px-3 py-1.5 rounded text-xs font-medium ${theme === 'light' ? 'bg-[#234842] text-white shadow-sm' : 'text-[#92c9c0] hover:text-white'}`}
                                                    >
                                                        Light
                                                    </button>
                                                    <button
                                                        onClick={() => setTheme('auto')}
                                                        className={`px-3 py-1.5 rounded text-xs font-medium ${theme === 'auto' ? 'bg-[#234842] text-white shadow-sm' : 'text-[#92c9c0] hover:text-white'}`}
                                                    >
                                                        Auto
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Security Settings */}
                                    <section className="space-y-4">
                                        <h3 className="text-white text-xl font-bold font-display border-b border-[#234842] pb-2">Security</h3>
                                        <div className="glass-panel rounded-xl p-6 space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-4">
                                                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                        <span className="material-symbols-outlined">lock</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">Password</p>
                                                        <p className="text-xs text-[#92c9c0]">Last changed 3 months ago</p>
                                                    </div>
                                                </div>
                                                <button className="text-primary text-sm font-medium hover:underline">Change</button>
                                            </div>
                                            <div className="border-t border-[#234842] my-4"></div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-4">
                                                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                                        <span className="material-symbols-outlined">phonelink_lock</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">Two-Factor Authentication</p>
                                                        <p className="text-xs text-[#92c9c0]">Secure your account with 2FA.</p>
                                                    </div>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={twoFactor}
                                                        onChange={() => setTwoFactor(!twoFactor)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-[#234842] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Integrations */}
                                    <section className="space-y-4">
                                        <h3 className="text-white text-xl font-bold font-display border-b border-[#234842] pb-2">Integrations</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="glass-panel p-4 rounded-xl flex items-center justify-between group hover:border-primary/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-black">account_balance</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium text-sm">Chase Bank</p>
                                                        <p className="text-primary text-xs font-medium">Connected</p>
                                                    </div>
                                                </div>
                                                <button className="text-[#92c9c0] hover:text-white transition-colors">
                                                    <span className="material-symbols-outlined">settings</span>
                                                </button>
                                            </div>
                                            <div className="glass-panel p-4 rounded-xl flex items-center justify-between group hover:border-primary/50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-[#5865F2] flex items-center justify-center text-white">
                                                        <span className="material-symbols-outlined">chat</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium text-sm">Slack Alerts</p>
                                                        <p className="text-[#92c9c0] text-xs">Not connected</p>
                                                    </div>
                                                </div>
                                                <button className="px-3 py-1.5 rounded-lg border border-[#234842] text-xs text-white font-medium hover:bg-[#234842] transition-colors">
                                                    Connect
                                                </button>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                {/* Right Column: Notifications & AI */}
                                <div className="space-y-8">
                                    {/* Notifications */}
                                    <section className="space-y-4">
                                        <h3 className="text-white text-xl font-bold font-display border-b border-[#234842] pb-2">Notifications</h3>
                                        <div className="glass-panel rounded-xl p-6 space-y-6">
                                            <div className="flex items-start justify-between">
                                                <div className="pr-4">
                                                    <p className="text-white text-sm font-medium">Weekly Digest</p>
                                                    <p className="text-[#92c9c0] text-xs mt-1">Summary of your financial activity every Monday.</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={weeklyDigest}
                                                        onChange={() => setWeeklyDigest(!weeklyDigest)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-9 h-5 bg-[#234842] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                                </label>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <div className="pr-4">
                                                    <p className="text-white text-sm font-medium">Transaction Alerts</p>
                                                    <p className="text-[#92c9c0] text-xs mt-1">Real-time alerts for transactions over $500.</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={transactionAlerts}
                                                        onChange={() => setTransactionAlerts(!transactionAlerts)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-9 h-5 bg-[#234842] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                                </label>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <div className="pr-4">
                                                    <p className="text-white text-sm font-medium">Marketing Emails</p>
                                                    <p className="text-[#92c9c0] text-xs mt-1">Product updates and promotional offers.</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                                    <input
                                                        type="checkbox"
                                                        checked={marketingEmails}
                                                        onChange={() => setMarketingEmails(!marketingEmails)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-9 h-5 bg-[#234842] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </section>

                                    {/* AI Preferences */}
                                    <section className="space-y-4">
                                        <h3 className="text-white text-xl font-bold font-display border-b border-[#234842] pb-2">AI Preferences</h3>
                                        <div className="glass-panel rounded-xl p-6 space-y-6 bg-gradient-to-br from-[#11221f] to-primary/5">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">psychology</span>
                                                    <p className="text-white text-sm font-medium">Assistant Personality</p>
                                                </div>
                                                <p className="text-[#92c9c0] text-xs mb-6">Adjust how the AI interprets your spending habits.</p>
                                                <div className="relative mb-2">
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="100"
                                                        value={aiPersonality}
                                                        onChange={(e) => setAiPersonality(e.target.value)}
                                                        className="w-full h-1 bg-[#234842] rounded-lg appearance-none cursor-pointer accent-primary"
                                                    />
                                                    <div className="flex justify-between mt-2 text-[10px] text-[#92c9c0] font-medium uppercase tracking-wider">
                                                        <span>Strict</span>
                                                        <span>Balanced</span>
                                                        <span>Creative</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                                                <p className="text-primary text-xs leading-relaxed">
                                                    <span className="font-bold">Note:</span> Your AI assistant currently prioritizes savings over high-risk investment suggestions.
                                                </p>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Danger Zone */}
                                    <section className="pt-8">
                                        <div className="border border-red-900/30 bg-red-900/10 rounded-xl p-6">
                                            <h4 className="text-red-400 font-bold text-sm mb-2">Danger Zone</h4>
                                            <p className="text-red-200/60 text-xs mb-4">Irreversible actions regarding your data.</p>
                                            <button className="w-full py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-900/20 text-xs font-bold transition-colors">
                                                Delete Account Data
                                            </button>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default SettingsPage
