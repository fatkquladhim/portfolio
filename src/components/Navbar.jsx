import { Link } from 'react-router-dom'
import { useSession } from '../lib/auth-client'

function Navbar() {
    const { data: session } = useSession()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-panel border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="hidden sm:block">
                        <h1 className="font-display font-bold text-4xl tracking-tight">Portfolio</h1>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    <div className="h-6 w-px bg-white/10"></div>
                    {session ? (
                        <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-all text-sm font-bold font-display">
                            <span className="material-symbols-outlined text-[18px]">dashboard</span>
                            <span>Dashboard</span>
                        </Link>
                    ) : (
                        <Link to="/login" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-all text-sm font-bold font-display">
                            <span className="material-symbols-outlined text-[18px]">lock</span>
                            <span>Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
