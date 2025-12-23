import { Link } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'

function Projects() {
    const { data: projects, isLoading, isError } = useProjects();

    if (isLoading) {
        return (
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-white/60">Loading projects...</p>
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6 text-center text-rose-400">
                    <p>Failed to load projects.</p>
                </div>
            </section>
        );
    }

    // Use only top 3 projects for the featured section
    const featuredProjects = projects?.slice(0, 3) || [];

    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Featured Projects</h2>
                        <p className="text-white/60 max-w-lg">A selection of my recent work in fintech, e-commerce, and AI development.</p>
                    </div>
                    <Link to="/portfolio" className="group flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors">
                        See All Projects
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((project) => (
                        <article
                            key={project.id}
                            className="group relative rounded-2xl overflow-hidden glass-panel hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="aspect-video w-full overflow-hidden bg-surface-dark relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 to-transparent z-10"></div>
                                <img
                                    alt={project.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src={project.primaryImage || 'https://via.placeholder.com/800x450?text=No+Image'}
                                />
                                <div className="absolute top-4 right-4 z-20">
                                    <span className={`px-3 py-1 rounded-full bg-primary/20 border border-primary/20 text-primary text-xs font-bold backdrop-blur-md`}>
                                        {project.status === 'live' ? 'Live' : 'Completed'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                    {project.name}
                                </h3>
                                <p className="text-sm text-white/60 mb-4 line-clamp-2">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.techStacks?.map((ts) => (
                                        <span key={ts.id} className="text-xs px-2 py-1 rounded bg-white/5 text-white/70">
                                            {ts.name}
                                        </span>
                                    ))}
                                </div>

                                <Link to={`/project/${project.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors">
                                    View Details <span className="material-symbols-outlined text-lg">arrow_outward</span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
