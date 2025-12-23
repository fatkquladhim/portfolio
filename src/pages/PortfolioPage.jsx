import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Link } from 'react-router-dom'
import { useProjects } from "../hooks/useProjects"

const filters = ['All', 'React', 'Next.js', 'Python', 'Mobile', 'Design']

function PortfolioPage() {
    const { data: projects, isLoading, isError } = useProjects();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Ambient Background Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent-purple/20 rounded-full blur-[120px] mix-blend-screen opacity-40"></div>
                <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen opacity-30"></div>
            </div>

            {/* Sticky Navbar */}
            <Navbar />

            <main className="relative z-10 flex-1 flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Page Heading */}
                <div className="w-full max-w-5xl mb-12">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="h-px w-8 bg-primary"></span>
                            <span className="text-primary text-sm font-bold uppercase tracking-widest">Public Zone</span>
                        </div>
                        <h1 className="text-white text-5xl md:text-6xl font-heading font-bold leading-tight tracking-tight">
                            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-purple">Work</span>
                        </h1>
                        <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mt-2 leading-relaxed">
                            A curated collection of projects exploring modern interface design, complex financial dashboards, and AI-driven digital experiences.
                        </p>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="w-full max-w-5xl mb-12">
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        {filters.map((filter, index) => (
                            <button
                                key={filter}
                                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full pl-5 pr-5 transition-all ${index === 0
                                    ? 'bg-primary shadow-[0_0_15px_rgba(19,236,200,0.3)] hover:scale-105'
                                    : 'bg-surface-dark border border-white/10 hover:border-primary/50 hover:bg-white/5 group'
                                    }`}
                            >
                                <p className={`text-sm font-${index === 0 ? 'bold' : 'medium'} ${index === 0 ? 'text-background-dark' : 'text-white/70 group-hover:text-white'
                                    }`}>
                                    {filter}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry Grid */}
                <div className="w-full max-w-5xl mb-16">
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : isError ? (
                        <div className="text-center py-20 text-red-400">
                            Failed to load projects. Please try again later.
                        </div>
                    ) : projects?.length === 0 ? (
                        <div className="text-center py-20 text-white/50">
                            No projects found.
                        </div>
                    ) : (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {projects.map((project) => (
                                <Link to={`/project/${project.id}`} key={project.id} className="block group">
                                    <div className="break-inside-avoid glass-card rounded-xl overflow-hidden group cursor-pointer transition-all hover:scale-[1.02]">
                                        <div className="relative w-full aspect-video md:aspect-square overflow-hidden">
                                            <img
                                                alt={project.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                src={project.primaryImage || 'https://via.placeholder.com/400x300'}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent opacity-60"></div>
                                            <div className="absolute top-3 right-3 flex gap-1">
                                                {project.techStacks?.slice(0, 1).map(tech => (
                                                    <div key={tech.id} className="bg-black/50 backdrop-blur-md rounded-md px-2 py-1">
                                                        <span className="text-xs font-bold text-primary">{tech.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-5 flex flex-col gap-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-white font-heading font-bold text-xl group-hover:text-primary transition-colors">{project.name}</h3>
                                                <span className="material-symbols-outlined text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all">arrow_forward</span>
                                            </div>
                                            <p className="text-white/60 text-sm line-clamp-2">{project.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>


                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 py-8 w-full">
                    <a className="flex size-10 items-center justify-center rounded-full bg-surface-dark border border-white/5 hover:border-primary/50 hover:bg-white/5 text-white transition-all group" href="#">
                        <span className="material-symbols-outlined text-white/70 group-hover:text-primary text-[20px]">chevron_left</span>
                    </a>
                    <a className="text-sm font-bold flex size-10 items-center justify-center text-background-dark rounded-full bg-primary shadow-[0_0_10px_rgba(19,236,200,0.4)]" href="#">1</a>
                    <a className="text-sm font-medium flex size-10 items-center justify-center text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-colors" href="#">2</a>
                    <a className="text-sm font-medium flex size-10 items-center justify-center text-white/70 hover:text-white rounded-full hover:bg-white/5 transition-colors" href="#">3</a>
                    <a className="flex size-10 items-center justify-center rounded-full bg-surface-dark border border-white/5 hover:border-primary/50 hover:bg-white/5 text-white transition-all group" href="#">
                        <span className="material-symbols-outlined text-white/70 group-hover:text-primary text-[20px]">chevron_right</span>
                    </a>
                </div>
            </main>

            {/* Footer */}
            <Footer />
            {/* Floating AI Assistant Button */}
            <div className="fixed bottom-8 right-8 z-50 group">
                <button className="flex items-center justify-center size-14 rounded-full bg-surface-dark border border-primary/30 text-primary shadow-[0_0_20px_rgba(19,236,200,0.2)] hover:shadow-[0_0_30px_rgba(19,236,200,0.4)] hover:bg-surface-dark hover:scale-110 transition-all duration-300">
                    <span className="material-symbols-outlined text-[28px] animate-pulse">smart_toy</span>
                </button>
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-surface-dark/90 backdrop-blur border border-white/10 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    <p className="text-white text-xs font-medium">Ask AI Assistant</p>
                </div>
            </div>
        </div>
    )
}

export default PortfolioPage
