import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useProject } from '../hooks/useProjects'

function ProjectDetailPage() {
    const { id } = useParams()
    const { data: project, isLoading, isError } = useProject(parseInt(id))

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (isError || !project) {
        return (
            <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center gap-4">
                <p className="text-rose-400 text-xl">Project not found.</p>
                <Link to="/portfolio" className="text-primary hover:underline">Back to Portfolio</Link>
            </div>
        )
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            {/* Ambient Background Gradient */}
            <div className="pointer-events-none fixed top-0 left-0 right-0 h-[800px] w-full gradient-blur z-0"></div>

            <Navbar />

            <main className="relative z-10 flex-1 px-4 md:px-10 lg:px-40 py-8 pt-28">
                <div className="mx-auto max-w-6xl flex flex-col gap-8">
                    {/* Back Button */}
                    <div className="flex justify-start">
                        <Link to="/portfolio" className="group flex items-center gap-2 text-white/70 hover:text-primary transition-all duration-300 text-sm font-bold">
                            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1" style={{ fontSize: '20px' }}>arrow_back</span>
                            <span>Back to Portfolio</span>
                        </Link>
                    </div>

                    {/* Hero Image */}
                    <div className="w-full relative aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
                        <div className="absolute inset-0 bg-background-dark/20 group-hover:bg-transparent transition-colors z-10"></div>
                        <img
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            src={project.primaryImage || project.projectImages?.[0]?.url || 'https://via.placeholder.com/1200x600?text=No+Image'}
                            alt={project.name}
                        />
                    </div>

                    {/* Title and Tags */}
                    <div className="flex flex-col gap-6 border-b border-white/10 pb-8">
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                            {project.name}
                        </h1>
                        <div className="flex flex-wrap gap-3">
                            {project.techStacks?.map((ts) => (
                                <span key={ts.id} className="glass-card px-4 py-2 rounded-full text-xs font-semibold text-primary uppercase tracking-wider border border-primary/20 hover:bg-primary/10 transition-colors cursor-default">
                                    {ts.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
                        {/* Left Column: Description */}
                        <div className="lg:col-span-8 flex flex-col gap-10 text-white/80 text-lg leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: project.description }}></div>

                            {/* Image Gallery */}
                            {project.projectImages && project.projectImages.length > 1 && (
                                <div className="space-y-8 mt-4">
                                    <h3 className="font-display text-2xl font-bold text-white">Interface Gallery</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {project.projectImages.filter(img => !img.isPrimary).map((img, idx) => (
                                            <div key={img.id || idx} className="glass-card p-2 rounded-xl">
                                                <img
                                                    src={img.url}
                                                    alt={`${project.name} gallery ${idx + 1}`}
                                                    className="w-full aspect-[4/3] rounded-lg object-cover bg-background-dark"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Project Info Sidebar */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-24 glass-card rounded-2xl p-6 md:p-8 flex flex-col gap-6">
                                <h4 className="font-display text-xl font-bold text-white border-b border-white/10 pb-4">Project Details</h4>
                                <div className="grid grid-cols-1 gap-5">
                                    <div>
                                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Status</p>
                                        <p className="text-white font-medium capitalize">{project.status}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Completion Date</p>
                                        <p className="text-white font-medium">
                                            {project.completionDate ? new Date(project.completionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Ongoing'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/10">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary-hover h-12 px-4 text-background-dark text-sm font-bold transition-all shadow-lg shadow-primary/20"
                                        >
                                            <span>View Live Demo</span>
                                            <span className="material-symbols-outlined text-lg">open_in_new</span>
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 hover:bg-white/10 h-12 px-4 text-white text-sm font-bold transition-all"
                                        >
                                            <span className="material-symbols-outlined text-lg">code</span>
                                            <span>View on GitHub</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default ProjectDetailPage
