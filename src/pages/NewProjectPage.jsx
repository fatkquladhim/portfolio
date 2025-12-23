import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useCreateProject } from '../hooks/useProjects'
import { useTechStacks } from '../hooks/useTechStacks'
import { uploadService } from '../services/upload.service'
import toast from 'react-hot-toast'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    rectSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function NewProjectPage() {
    const navigate = useNavigate()
    const { mutate: createProject, isLoading } = useCreateProject()
    const { data: allTechStacks = [] } = useTechStacks()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'draft',
        liveUrl: '',
        githubUrl: '',
        completionDate: ''
    })
    const [techStack, setTechStack] = useState(['React', 'Tailwind CSS'])
    const [images, setImages] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const [techInput, setTechInput] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const suggestionRef = useRef(null)

    const handleInputChange = (e) => {
        const { id, value } = e.target
        const keyMap = {
            'project-title': 'name',
            'live-url': 'liveUrl',
            'github-url': 'githubUrl',
            'completion-date': 'completionDate'
        }
        setFormData(prev => ({ ...prev, [keyMap[id] || id]: value }))
    }

    const handleAddTech = (techName) => {
        const name = techName.trim()
        if (name && !techStack.includes(name)) {
            setTechStack([...techStack, name])
        }
        setTechInput('')
        setShowSuggestions(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault()
            handleAddTech(techInput)
        }
    }

    const handleRemoveTech = (tech) => {
        setTechStack(techStack.filter((t) => t !== tech))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.name) return toast.error('Project title is required')

        const payload = {
            ...formData,
            techStack,
            images,
            completionDate: formData.completionDate ? new Date(formData.completionDate).toISOString() : null
        }

        createProject(payload, {
            onSuccess: () => {
                toast.success('Project created successfully!')
                navigate('/cms')
            },
            onError: (error) => {
                toast.error(error.response?.data?.error || 'Failed to create project')
            }
        })
    }

    const filteredSuggestions = allTechStacks.filter(ts =>
        ts.name.toLowerCase().includes(techInput.toLowerCase()) &&
        !techStack.includes(ts.name)
    )

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = (event) => {
        const { active, over } = event

        if (active.id !== over.id) {
            setImages((items) => {
                const oldIndex = items.findIndex((item) => item.url === active.id)
                const newIndex = items.findIndex((item) => item.url === over.id)
                const newItems = arrayMove(items, oldIndex, newIndex)
                return newItems.map((item, index) => ({ ...item, order: index }))
            })
        }
    }

    const handleFileUpload = async (files) => {
        const fileList = Array.from(files)
        for (const file of fileList) {
            if (!file.type.startsWith('image/')) {
                toast.error(`${file.name} is not an image`)
                continue
            }
            try {
                const result = await uploadService.uploadImage(file)
                setImages(prev => [
                    ...prev,
                    { url: result.url, isPrimary: prev.length === 0 && !prev.some(img => img.isPrimary), order: prev.length }
                ])
            } catch (err) {
                toast.error(`Failed to upload ${file.name}`)
            }
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="bg-background-dark text-slate-200 font-body selection:bg-primary selection:text-background-dark overflow-hidden">
            <div className="flex h-screen w-full">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 relative min-h-screen flex flex-col overflow-y-auto">
                    {/* Background Gradients */}
                    <div className="fixed inset-0 z-0 pointer-events-none">
                        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="relative z-10 w-full max-w-5xl mx-auto p-6 md:p-10 flex flex-col gap-6">
                        {/* Page Heading */}
                        <header className="flex flex-wrap justify-between items-end gap-4 pb-4 border-b border-[#32675e]/30">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight font-display">Create New Project</h2>
                                <p className="text-text-secondary text-sm md:text-base">Add details to showcase your latest work in the portfolio.</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-lg border border-[#32675e] text-text-secondary text-sm font-medium hover:bg-[#19332f] transition-colors"
                                    onClick={() => navigate('/cms')}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    form="new-project-form"
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-[#11221f] text-sm font-bold shadow-[0_0_20px_rgba(19,236,200,0.3)] hover:bg-primary-dark hover:shadow-[0_0_30px_rgba(19,236,200,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="h-5 w-5 border-2 border-[#11221f] border-t-transparent animate-spin rounded-full"></div>
                                    ) : (
                                        <span className="material-symbols-outlined text-[20px]">check</span>
                                    )}
                                    Publish Project
                                </button>
                            </div>
                        </header>

                        {/* Main Form Card */}
                        <form id="new-project-form" onSubmit={handleSubmit} className="bg-surface-glass backdrop-blur-md border border-[#32675e]/40 rounded-2xl p-6 md:p-8 flex flex-col gap-8 shadow-2xl">
                            {/* Section 1: Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Project Title */}
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-white text-sm font-medium" htmlFor="project-title">Project Title</label>
                                    <input
                                        className="w-full bg-[#11221f]/80 border border-[#32675e] rounded-lg px-4 py-3 text-white placeholder-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                                        id="project-title"
                                        placeholder="e.g. Fintech Dashboard Redesign"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Tech Stack */}
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label className="text-white text-sm font-medium">Tech Stack</label>
                                    <div className="relative" ref={suggestionRef}>
                                        <div
                                            className="w-full bg-[#11221f]/80 border border-[#32675e] rounded-lg p-2 min-h-[52px] flex flex-wrap gap-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors cursor-text"
                                            onClick={() => document.getElementById('tech-input').focus()}
                                        >
                                            {techStack.map((tech) => (
                                                <span key={tech} className="inline-flex items-center gap-1 bg-[#234842] text-primary text-xs font-medium px-2 py-1 rounded border border-[#32675e]">
                                                    {tech}
                                                    <button
                                                        className="hover:text-white"
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleRemoveTech(tech)
                                                        }}
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">close</span>
                                                    </button>
                                                </span>
                                            ))}
                                            <input
                                                className="bg-transparent border-none p-1 text-white placeholder-text-secondary/50 focus:ring-0 text-sm flex-1 min-w-[120px]"
                                                id="tech-input"
                                                placeholder="Add tech (e.g. Node.js)..."
                                                type="text"
                                                value={techInput}
                                                onFocus={() => setShowSuggestions(true)}
                                                onChange={(e) => {
                                                    setTechInput(e.target.value)
                                                    setShowSuggestions(true)
                                                }}
                                                onKeyDown={handleKeyDown}
                                            />
                                        </div>

                                        {/* Suggestions Dropdown */}
                                        {showSuggestions && filteredSuggestions.length > 0 && (
                                            <div className="absolute z-50 w-full mt-1 bg-[#1a2e2b] border border-[#32675e] rounded-lg shadow-xl max-h-48 overflow-y-auto">
                                                {filteredSuggestions.map((ts) => (
                                                    <button
                                                        key={ts.id}
                                                        type="button"
                                                        className="w-full text-left px-4 py-2 text-sm text-[#92c9c0] hover:bg-primary hover:text-[#0d1b19] transition-colors"
                                                        onClick={() => handleAddTech(ts.name)}
                                                    >
                                                        {ts.name}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Date & Status */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-white text-sm font-medium" htmlFor="completion-date">Completion Date</label>
                                    <div className="relative">
                                        <input
                                            className="w-full bg-[#11221f]/80 border border-[#32675e] rounded-lg px-4 py-3 text-white placeholder-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors [color-scheme:dark]"
                                            id="completion-date"
                                            type="date"
                                            value={formData.completionDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-white text-sm font-medium">Project Status</label>
                                    <div className="flex bg-[#11221f]/80 border border-[#32675e] rounded-lg p-1 h-[50px]">
                                        <label className="flex-1 relative cursor-pointer">
                                            <input
                                                className="peer sr-only"
                                                name="status"
                                                type="radio"
                                                value="draft"
                                                checked={formData.status === 'draft'}
                                                onChange={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                                            />
                                            <div className="w-full h-full flex items-center justify-center rounded text-sm font-medium text-text-secondary peer-checked:bg-[#234842] peer-checked:text-white transition-all">
                                                Draft
                                            </div>
                                        </label>
                                        <label className="flex-1 relative cursor-pointer">
                                            <input
                                                className="peer sr-only"
                                                name="status"
                                                type="radio"
                                                value="published"
                                                checked={formData.status === 'published'}
                                                onChange={() => setFormData(prev => ({ ...prev, status: 'published' }))}
                                            />
                                            <div className="w-full h-full flex items-center justify-center rounded text-sm font-medium text-text-secondary peer-checked:bg-primary peer-checked:text-[#11221f] peer-checked:font-bold transition-all shadow-sm">
                                                Published
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Rich Text Description */}
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium">Description</label>
                                <div className="w-full bg-[#11221f]/80 border border-[#32675e] rounded-lg overflow-hidden flex flex-col focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors">
                                    <div className="flex items-center gap-1 p-2 border-b border-[#32675e] bg-[#1a2e2b]">
                                        <button className="p-1.5 rounded hover:bg-[#234842] text-text-secondary hover:text-white transition-colors" type="button">
                                            <span className="material-symbols-outlined text-[18px]">format_bold</span>
                                        </button>
                                        <button className="p-1.5 rounded hover:bg-[#234842] text-text-secondary hover:text-white transition-colors" type="button">
                                            <span className="material-symbols-outlined text-[18px]">format_italic</span>
                                        </button>
                                        <button className="p-1.5 rounded hover:bg-[#234842] text-text-secondary hover:text-white transition-colors" type="button">
                                            <span className="material-symbols-outlined text-[18px]">format_underlined</span>
                                        </button>
                                        <div className="w-px h-4 bg-[#32675e] mx-1"></div>
                                        <button className="p-1.5 rounded hover:bg-[#234842] text-text-secondary hover:text-white transition-colors" type="button">
                                            <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                                        </button>
                                        <button className="p-1.5 rounded hover:bg-[#234842] text-text-secondary hover:text-white transition-colors" type="button">
                                            <span className="material-symbols-outlined text-[18px]">link</span>
                                        </button>
                                    </div>
                                    <textarea
                                        className="w-full bg-transparent border-none p-4 text-white placeholder-text-secondary/50 focus:ring-0 min-h-[160px] resize-y"
                                        placeholder="Describe the project goals, challenges, and outcomes..."
                                        id="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Section 3: Project Gallery */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-white text-sm font-medium">Project Gallery</label>
                                    <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-[#234842] text-primary text-xs font-bold hover:bg-[#2c5a53] transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
                                        Add Photo
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => handleFileUpload(e.target.files)}
                                        />
                                    </label>
                                </div>

                                <div
                                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={handleDrop}
                                    className={`relative min-h-[160px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 transition-all ${isDragging ? 'border-primary bg-primary/5' : 'border-[#32675e]/40 bg-[#11221f]'
                                        }`}
                                >
                                    {images.length > 0 ? (
                                        <div className="p-4 w-full">
                                            <DndContext
                                                sensors={sensors}
                                                collisionDetection={closestCenter}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <SortableContext
                                                    items={images.map(img => img.url)}
                                                    strategy={rectSortingStrategy}
                                                >
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                        {images.map((img, index) => (
                                                            <SortableItem
                                                                key={img.url}
                                                                img={img}
                                                                index={index}
                                                                onSetPrimary={() => {
                                                                    setImages(prev => prev.map((item, i) => ({
                                                                        ...item,
                                                                        isPrimary: i === index
                                                                    })))
                                                                }}
                                                                onDelete={() => {
                                                                    setImages(prev => {
                                                                        const filtered = prev.filter((_, i) => i !== index)
                                                                        if (img.isPrimary && filtered.length > 0) {
                                                                            filtered[0].isPrimary = true
                                                                        }
                                                                        return filtered
                                                                    })
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                </SortableContext>
                                            </DndContext>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-text-secondary/50 gap-2">
                                            <span className="material-symbols-outlined text-[32px]">upload_file</span>
                                            <p className="text-xs">Drag and drop photos here, or click "Add Photo"</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Section 4: External Links */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-white text-sm font-medium" htmlFor="live-url">Live Demo URL</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                                            <span className="material-symbols-outlined text-[20px]">public</span>
                                        </span>
                                        <input
                                            className="w-full bg-[#11221f]/80 border border-[#32675e] rounded-lg pl-10 pr-4 py-3 text-white placeholder-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                                            id="live-url"
                                            placeholder="https://"
                                            type="url"
                                            value={formData.liveUrl}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-white text-sm font-medium" htmlFor="github-url">GitHub Repo</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                                            <span className="material-symbols-outlined text-[20px]">code</span>
                                        </span>
                                        <input
                                            className="w-full bg-[#11221f]/80 border border-[#32675e] rounded-lg pl-10 pr-4 py-3 text-white placeholder-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                                            id="github-url"
                                            placeholder="https://github.com/"
                                            type="url"
                                            value={formData.githubUrl}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex justify-end gap-4 pt-4 border-t border-[#32675e]/30 mt-2">
                                <button
                                    className="px-6 py-3 rounded-lg border border-transparent text-text-secondary text-sm font-medium hover:text-white hover:bg-[#234842]/50 transition-colors"
                                    type="button"
                                    onClick={() => navigate('/cms')}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-8 py-3 rounded-lg bg-primary text-[#11221f] text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}

function SortableItem({ img, index, onSetPrimary, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: img.url })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="relative group aspect-video rounded-xl overflow-hidden border border-[#32675e]/40 bg-[#11221f] cursor-grab active:cursor-grabbing"
        >
            <img src={img.url} alt={`Project ${index}`} className="w-full h-full object-cover pointer-events-none" />

            {/* Drag Handle */}
            <div className="absolute top-2 right-2 p-1 bg-black/40 rounded text-white/40 group-hover:text-white transition-colors" {...listeners}>
                <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
            </div>

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                    type="button"
                    onClick={onSetPrimary}
                    className={`p-2 rounded-full transition-colors ${img.isPrimary ? 'bg-primary text-[#11221f]' : 'bg-white/10 text-white hover:bg-primary hover:text-[#11221f]'}`}
                    title={img.isPrimary ? 'Primary Image' : 'Set as Primary'}
                >
                    <span className="material-symbols-outlined text-[20px]">{img.isPrimary ? 'star' : 'star_outline'}</span>
                </button>
                <button
                    type="button"
                    onClick={onDelete}
                    className="p-2 rounded-full bg-white/10 text-white hover:bg-red-500 transition-colors"
                    title="Delete Image"
                >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
            </div>

            {img.isPrimary && (
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-[#11221f] text-[10px] font-bold rounded uppercase tracking-wider">
                    Primary
                </div>
            )}
        </div>
    )
}

export default NewProjectPage

