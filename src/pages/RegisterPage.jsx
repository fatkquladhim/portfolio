
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../services/auth.service'
import toast from 'react-hot-toast'

function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const { data, error } = await AuthService.register(email, password, name)

        if (error) {
            toast.error(error.message || 'Failed to register')
        } else {
            toast.success('Registration successful! Please login.')
            navigate('/login')
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
                    <Link to="/" className="flex items-center gap-3 text-white group cursor-pointer">
                        <div className="size-8 text-primary">
                            <span className="material-symbols-outlined text-[32px]">shield_lock</span>
                        </div>
                        <div>
                            <h2 className="text-white text-lg font-bold font-display tracking-tight leading-none">Private Zone</h2>
                            <span className="text-xs text-primary/80 font-medium tracking-wide">SECURE ACCESS</span>
                        </div>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
                <div className="w-full max-w-[440px] glass-card rounded-2xl p-8 sm:p-10 relative overflow-hidden group/card">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center size-14 rounded-full bg-input-bg border border-input-border mb-4 shadow-inner">
                            <span className="material-symbols-outlined text-primary text-[28px]">person_add</span>
                        </div>
                        <h1 className="text-white font-display text-3xl font-bold tracking-tight mb-2">CREATE ACCOUNT</h1>
                        <p className="text-slate-400 text-sm">Join the Private Finance Dashboard</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleRegister}>
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300 ml-1" htmlFor="name">Full Name</label>
                            <div className="relative glass-input group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-[#92c9c0] text-[20px]">person</span>
                                </div>
                                <input
                                    className="block w-full pl-11 pr-4 py-3.5 bg-input-bg border border-input-border rounded-xl text-white placeholder-[#5d857d] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors sm:text-sm"
                                    id="name"
                                    placeholder="Your Name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
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

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300 ml-1" htmlFor="password">Password</label>
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

                        <button
                            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-background-dark font-bold py-3.5 px-4 rounded-xl transition-all transform active:scale-[0.98] shadow-[0_0_20px_rgba(19,236,200,0.15)] hover:shadow-[0_0_25px_rgba(19,236,200,0.3)] mt-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isLoading}
                        >
                            <span className="font-display tracking-wide">
                                {isLoading ? '[ Creating Account... ]' : '[ Register Now ]'}
                            </span>
                            {!isLoading && (
                                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-bold hover:underline">Login here</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

export default RegisterPage
