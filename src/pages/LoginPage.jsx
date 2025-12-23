import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service'
import toast from 'react-hot-toast'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const { data, error } = await AuthService.login(email, password)

        if (error) {
            toast.error(error.message || 'Failed to login')
        } else {
            toast.success('Successfully logged in!')
            navigate('/dashboard')
        }
        setIsLoading(false)
    }

    return (
        <div className="font-body bg-background-dark text-white min-h-screen flex flex-col overflow-hidden relative selection:bg-primary selection:text-background-dark">
            {/* Ambient Background */}
            <div className="fixed inset-0 bg-mesh-dark animate-mesh -z-10"></div>
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none -z-10"></div>

            {/* Top Navigation */}
            <header className="w-full z-20 px-6 py-4 lg:px-12 border-b border-[#234842]/50 bg-[#11221f]/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white group cursor-pointer">
                        <div>
                            <h2 className="text-white text-2xl font-bold font-display tracking-tight leading-none">Private Zone</h2>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <nav className="flex items-center gap-6">
                            <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium">Public Portfolio</Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
                {/* Center Card */}
                <div className="w-full max-w-[440px] glass-card rounded-2xl p-8 sm:p-10 relative overflow-hidden group/card">
                    {/* Decorative Top Gradient Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>

                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h1 className="text-white font-display text-3xl font-bold tracking-tight mb-2">admin login</h1>
                        <p className="text-slate-400 text-sm">Access the Private Finance Dashboard</p>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300 ml-1" htmlFor="email">Email Address</label>
                            <div className="relative glass-input group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-[#92c9c0] text-[20px]">mail</span>
                                </div>
                                <input
                                    className="block w-full pl-11 pr-4 py-3.5 bg-input-bg border border-input-border rounded-xl text-white placeholder-[#5d857d] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors sm:text-sm"
                                    id="email"
                                    placeholder="admin@example.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="block text-sm font-medium text-slate-300" htmlFor="password">Password</label>
                                <a className="text-xs font-medium text-primary hover:text-primary-hover transition-colors" href="#">Forgot password?</a>
                            </div>
                            <div className="relative glass-input group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-[#92c9c0] text-[20px]">key</span>
                                </div>
                                <input
                                    className="block w-full pl-11 pr-12 py-3.5 bg-input-bg border border-input-border rounded-xl text-white placeholder-[#5d857d] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors sm:text-sm"
                                    id="password"
                                    placeholder="••••••••"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#92c9c0] hover:text-white transition-colors cursor-pointer"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Primary Action */}
                        <button
                            className="w-full flex items-center justify-center mt-6 gap-2 bg-primary hover:bg-primary-hover text-background-dark font-bold py-3.5 px-4 rounded-xl transition-all transform active:scale-[0.98] shadow-[0_0_20px_rgba(19,236,200,0.15)] hover:shadow-[0_0_25px_rgba(19,236,200,0.3)] mt-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isLoading}
                        >
                            <span className="font-display tracking-wide">
                                {isLoading ? '[ Verifying... ]' : '[ Login Securely ]'}
                            </span>
                            {!isLoading && (
                                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                            )}
                        </button>
                    </form>
                    {/* Footer Note */}
                    <p className="mt-4 text-center text-xs text-slate-500">
                        Protected by Enterprise Grade Security. <br />
                        Unauthorized access is prohibited.
                    </p>
                </div>
            </main>
        </div>
    )
}

export default LoginPage
