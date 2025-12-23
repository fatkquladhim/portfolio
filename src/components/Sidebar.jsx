import { Link, useNavigate } from 'react-router-dom'
import { useSession, signOut } from '../lib/auth-client'

function Sidebar() {
    const { data: session } = useSession()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    navigate('/login')
                }
            }
        })
    }
    return (
        <aside className="hidden md:flex flex-col w-64 h-full bg-[#111318] border-r border-white/5 pt-6 pb-4 px-4 justify-between shrink-0">
            <div className="flex flex-col gap-8">
                {/* User Profile Summary */}
                <div className="flex items-center gap-3 px-2">
                    <div
                        className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary/20 flex items-center justify-center bg-white/5"
                        style={{ backgroundImage: session?.user?.image ? `url("${session.user.image}")` : 'none' }}
                    >
                        {!session?.user?.image && <span className="text-primary font-bold">{session?.user?.name?.charAt(0) || 'U'}</span>}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-white text-sm font-semibold leading-tight">{session?.user?.name || 'User'}</h1>
                        <p className="text-primary text-xs font-medium truncate max-w-[120px]">{session?.user?.email || 'Pro Account'}</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1">
                    <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
                        <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <Link to="/add-transaction" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
                        <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">add_circle</span>
                        <span className="text-sm font-medium">Transaction</span>
                    </Link>
                    <Link to="/report" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
                        <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">assessment</span>
                        <span className="text-sm font-medium">Report</span>
                    </Link>
                    <Link to="/cms" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
                        <span className="material-symbols-outlined text-[20px] group-hover:text-secondary transition-colors">article</span>
                        <span className="text-sm font-medium">CMS</span>
                    </Link>
                    <Link to="/categories" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
                        <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">category</span>
                        <span className="text-sm font-medium">Categories</span>
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
                        <span className="material-symbols-outlined text-[20px] group-hover:text-white transition-colors">settings</span>
                        <span className="text-sm font-medium">Settings</span>
                    </Link>
                </nav>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                    <span className="text-sm font-medium">View Site</span>
                </Link>
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
