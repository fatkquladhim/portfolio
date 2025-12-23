import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useProjects, useDeleteProject } from '../hooks/useProjects'
import { useInquiries, useMarkInquiryAsRead, useDeleteInquiry } from '../hooks/useInquiries'
import toast from 'react-hot-toast'

function CMSPage() {
    const [openForWork, setOpenForWork] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeTab, setActiveTab] = useState('projects')

    const { data: projects = [], isLoading: isLoadingProjects } = useProjects()
    const deleteProjectMutation = useDeleteProject()

    const { data: inquiries = [], isLoading: isLoadingInquiries } = useInquiries()
    const markReadMutation = useMarkInquiryAsRead()
    const deleteInquiryMutation = useDeleteInquiry()

    const handleDeleteProject = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProjectMutation.mutateAsync(id)
                toast.success('Project deleted successfully')
            } catch (error) {
                toast.error('Failed to delete project')
            }
        }
    }

    const handleMarkAsRead = async (id, currentStatus) => {
        try {
            await markReadMutation.mutateAsync({ id, isRead: !currentStatus })
            toast.success(`Inquiry marked as ${!currentStatus ? 'read' : 'unread'}`)
        } catch (error) {
            toast.error('Failed to update status')
        }
    }

    const handleDeleteInquiry = async (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            try {
                await deleteInquiryMutation.mutateAsync(id)
                toast.success('Inquiry deleted successfully')
            } catch (error) {
                toast.error('Failed to delete inquiry')
            }
        }
    }

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredInquiries = inquiries.filter(inquiry =>
        inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inquiry.message.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getStatusBadge = (status) => {
        switch (status) {
            case 'published':
                return (
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                        </span>
                        <span className="text-white font-medium">Published</span>
                    </div>
                )
            case 'draft':
                return (
                    <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-yellow-500/50 ring-1 ring-yellow-500"></span>
                        <span className="text-yellow-100 font-medium">Draft</span>
                    </div>
                )
            case 'archived':
                return (
                    <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-gray-500/50 ring-1 ring-gray-500"></span>
                        <span className="text-gray-400 font-medium">Archived</span>
                    </div>
                )
            default:
                return (
                    <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-primary/50 ring-1 ring-primary"></span>
                        <span className="text-white font-medium uppercase">{status}</span>
                    </div>
                )
        }
    }

    const getTechColor = (color) => {
        switch (color) {
            case 'primary':
                return 'text-primary border-primary/20'
            case 'purple':
                return 'text-purple-400 border-purple-500/20'
            case 'blue':
                return 'text-blue-400 border-blue-500/20'
            default:
                return 'text-[#92c9bb] border-[#92c9bb]/20'
        }
    }

    return (
        <div className="bg-background-dark font-body antialiased overflow-hidden">
            <div className="flex h-screen w-full overflow-hidden">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-10">
                        <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
                            {/* Header */}
                            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-white text-4xl font-bold font-display tracking-tight">📝 Content Manager</h1>
                                    <p className="text-[#92c9c0] text-base max-w-lg">Manage your portfolio projects, case studies, and site configuration from a single command center.</p>
                                </div>
                                <Link to="/project/new" className="group flex items-center gap-2 bg-primary hover:bg-primary-hover text-[#0d1b19] px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(19,236,182,0.3)] hover:shadow-[0_0_30px_rgba(19,236,182,0.5)] active:scale-95 text-center">
                                    <span className="material-symbols-outlined text-xl">add</span>
                                    <span>New Project</span>
                                </Link>
                            </header>

                            {/* Controls Bar */}
                            <div className="flex flex-col gap-6 sticky top-0 z-10 bg-background-dark/95 backdrop-blur-xl py-4 -mx-4 px-4 border-b border-[#23483f]/30">
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                    {/* Tabs */}
                                    <div className="flex gap-8 w-full md:w-auto overflow-x-auto">
                                        <button
                                            onClick={() => setActiveTab('projects')}
                                            className={`relative pb-3 text-sm tracking-wide transition-all ${activeTab === 'projects' ? 'text-white font-semibold' : 'text-[#92c9c0] hover:text-white font-medium'}`}
                                        >
                                            Projects
                                            {activeTab === 'projects' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_#13ecc8]"></span>}
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('inquiries')}
                                            className={`relative pb-3 text-sm tracking-wide transition-all ${activeTab === 'inquiries' ? 'text-white font-semibold' : 'text-[#92c9c0] hover:text-white font-medium'}`}
                                        >
                                            Inquiries
                                            {inquiries.some(i => !i.isRead) && <span className="absolute -top-1 -right-2 flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>}
                                            {activeTab === 'inquiries' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_#13ecc8]"></span>}
                                        </button>
                                    </div>

                                    {/* Status Toggle */}
                                    <div className="flex items-center gap-4 bg-surface-dark border border-[#23483f] px-4 py-2 rounded-full shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary text-xl">public</span>
                                            <span className="text-white text-sm font-medium">Open for Work</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={openForWork}
                                                onChange={() => setOpenForWork(!openForWork)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-[#23483f] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-checked:shadow-[0_0_10px_rgba(19,236,200,0.4)]"></div>
                                        </label>
                                    </div>
                                </div>

                                {/* Search & Filter */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="relative flex-1 group">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#92c9c0] group-focus-within:text-primary transition-colors">
                                            <span className="material-symbols-outlined">search</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="block w-full p-3 pl-10 text-sm text-white border border-[#23483f] rounded-xl bg-surface-dark focus:ring-1 focus:ring-primary focus:border-primary placeholder-[#92c9c0]/50 focus:outline-none transition-all shadow-sm"
                                            placeholder={`Search ${activeTab === 'projects' ? 'projects' : 'inquiries'}...`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {activeTab === 'projects' ? (
                                <div className="relative overflow-hidden rounded-xl border border-[#23483f] bg-surface-dark/50 shadow-2xl backdrop-blur-sm">
                                    {isLoadingProjects ? (
                                        <div className="flex items-center justify-center p-20">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                        </div>
                                    ) : (
                                        <table className="w-full text-left text-sm text-[#92c9c0]">
                                            <thead className="text-xs uppercase bg-[#23483f]/30 text-white font-display tracking-wider">
                                                <tr>
                                                    <th className="px-6 py-4 w-12 text-center" scope="col"></th>
                                                    <th className="px-6 py-4 font-semibold" scope="col">Project</th>
                                                    <th className="px-6 py-4 font-semibold" scope="col">Tech Stack</th>
                                                    <th className="px-6 py-4 font-semibold" scope="col">Status</th>
                                                    <th className="px-6 py-4 font-semibold text-right" scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#23483f]/30">
                                                {filteredProjects.map((project) => (
                                                    <tr key={project.id} className="group hover:bg-[#23483f]/20 transition-colors border-l-2 border-l-transparent hover:border-l-primary">
                                                        <td className="px-2 py-4 text-center cursor-grab active:cursor-grabbing text-[#92c9c0]/50 hover:text-primary">
                                                            <span className="material-symbols-outlined text-xl">drag_indicator</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-4">
                                                                <div
                                                                    className="h-12 w-20 rounded-lg bg-cover bg-center shrink-0 border border-[#23483f] group-hover:border-primary/50 transition-colors bg-surface-dark"
                                                                    style={{ backgroundImage: project.primaryImage ? `url('${project.primaryImage}')` : 'none' }}
                                                                >
                                                                    {!project.primaryImage && (
                                                                        <div className="h-full w-full flex items-center justify-center text-[#92c9c0]/20">
                                                                            <span className="material-symbols-outlined text-2xl">image</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold text-white text-base">{project.name}</div>
                                                                    <div className="text-xs opacity-70">
                                                                        {project.completionDate ? `Completed ${new Date(project.completionDate).toLocaleDateString()}` : 'No date'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex flex-wrap gap-2">
                                                                {project.techStacks?.map((tech, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#11221e] border ${getTechColor(tech.color)}`}
                                                                    >
                                                                        {tech.name}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">{getStatusBadge(project.status)}</td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Link
                                                                    to={`/project/edit/${project.id}`}
                                                                    className="p-2 rounded-lg hover:bg-[#23483f] text-[#92c9c0] hover:text-white transition-colors"
                                                                >
                                                                    <span className="material-symbols-outlined text-xl">edit</span>
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDeleteProject(project.id)}
                                                                    className="p-2 rounded-lg hover:bg-[#23483f] text-[#92c9c0] hover:text-red-400 transition-colors"
                                                                >
                                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {filteredProjects.length === 0 && (
                                                    <tr>
                                                        <td colSpan="5" className="px-6 py-10 text-center text-[#92c9c0]/50">
                                                            No projects found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            ) : (
                                <div className="relative overflow-hidden rounded-xl border border-[#23483f] bg-surface-dark/50 shadow-2xl backdrop-blur-sm">
                                    {isLoadingInquiries ? (
                                        <div className="flex items-center justify-center p-20">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                        </div>
                                    ) : (
                                        <table className="w-full text-left text-sm text-[#92c9c0]">
                                            <thead className="text-xs uppercase bg-[#23483f]/30 text-white font-display tracking-wider">
                                                <tr>
                                                    <th className="px-6 py-4 font-semibold" scope="col">Sender</th>
                                                    <th className="px-6 py-4 font-semibold" scope="col">Message</th>
                                                    <th className="px-6 py-4 font-semibold" scope="col">Date</th>
                                                    <th className="px-6 py-4 font-semibold text-right" scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#23483f]/30">
                                                {filteredInquiries.map((inquiry) => (
                                                    <tr key={inquiry.id} className={`group hover:bg-[#23483f]/20 transition-colors border-l-2 ${inquiry.isRead ? 'border-l-transparent opacity-70' : 'border-l-primary bg-primary/5'}`}>
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <div className={`font-bold text-white text-base ${!inquiry.isRead ? 'text-primary' : ''}`}>{inquiry.name}</div>
                                                                <div className="text-xs opacity-70">{inquiry.email}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="max-w-md line-clamp-2 text-white/90">
                                                                {inquiry.message}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {new Date(inquiry.createdAt).toLocaleString()}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button
                                                                    onClick={() => handleMarkAsRead(inquiry.id, inquiry.isRead)}
                                                                    className="p-2 rounded-lg hover:bg-[#23483f] text-[#92c9c0] hover:text-primary transition-colors"
                                                                    title={inquiry.isRead ? 'Mark as unread' : 'Mark as read'}
                                                                >
                                                                    <span className="material-symbols-outlined text-xl">
                                                                        {inquiry.isRead ? 'mark_email_unread' : 'mark_email_read'}
                                                                    </span>
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteInquiry(inquiry.id)}
                                                                    className="p-2 rounded-lg hover:bg-[#23483f] text-[#92c9c0] hover:text-red-400 transition-colors"
                                                                >
                                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {filteredInquiries.length === 0 && (
                                                    <tr>
                                                        <td colSpan="4" className="px-6 py-10 text-center text-[#92c9c0]/50">
                                                            No inquiries found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="h-20"></div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CMSPage
