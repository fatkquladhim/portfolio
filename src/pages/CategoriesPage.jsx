
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../hooks/useCategories'
import toast from 'react-hot-toast'

function CategoriesPage() {
    const { data: categories, isLoading } = useCategories()
    const createMutation = useCreateCategory()
    const updateMutation = useUpdateCategory()
    const deleteMutation = useDeleteCategory()

    const [newCategoryName, setNewCategoryName] = useState('')
    const [editingCategory, setEditingCategory] = useState(null)
    const [editName, setEditName] = useState('')

    const handleCreate = (e) => {
        e.preventDefault()
        if (!newCategoryName.trim()) return
        createMutation.mutate({ name: newCategoryName }, {
            onSuccess: () => {
                setNewCategoryName('')
                toast.success('Category created!')
            }
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        if (!editName.trim()) return
        updateMutation.mutate({ id: editingCategory.id, data: { name: editName } }, {
            onSuccess: () => {
                setEditingCategory(null)
                toast.success('Category updated!')
            }
        })
    }

    const handleDelete = (id) => {
        if (window.confirm('Delete this category? This might affect transactions.')) {
            deleteMutation.mutate(id, {
                onSuccess: () => toast.success('Category deleted!')
            })
        }
    }

    return (
        <div className="bg-background-dark font-body antialiased overflow-hidden">
            <div className="flex h-screen w-full overflow-hidden">
                {/* Sidebar */}
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-6 md:p-10">
                    <div className="max-w-4xl mx-auto">
                        <header className="mb-8">
                            <h1 className="text-3xl font-display font-bold">Manage Categories</h1>
                            <p className="text-[#92c9c0]">Categorize your transactions for better reporting.</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Create Section */}
                            <div className="md:col-span-1">
                                <form onSubmit={handleCreate} className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
                                    <h3 className="text-lg font-bold">New Category</h3>
                                    <input
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        placeholder="Category Name"
                                        className="bg-[#11221f]/50 border border-[#234842] rounded-xl px-4 py-2 focus:outline-none focus:border-primary transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={createMutation.isLoading}
                                        className="bg-primary text-[#11221f] font-bold py-2 rounded-xl hover:bg-emerald-400 transition-all disabled:opacity-50"
                                    >
                                        Add Category
                                    </button>
                                </form>
                            </div>

                            {/* List Section */}
                            <div className="md:col-span-2">
                                <div className="glass-panel rounded-2xl overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead className="bg-white/5 text-[#92c9c0] text-sm hidden md:table-header-group">
                                            <tr>
                                                <th className="p-4">Name</th>
                                                <th className="p-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isLoading ? (
                                                <tr><td colSpan="2" className="p-8 text-center text-slate-500">Loading...</td></tr>
                                            ) : (
                                                categories?.map((cat) => (
                                                    <tr key={cat.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                                                        <td className="p-4">
                                                            {editingCategory?.id === cat.id ? (
                                                                <form onSubmit={handleUpdate} className="flex gap-2">
                                                                    <input
                                                                        autoFocus
                                                                        type="text"
                                                                        value={editName}
                                                                        onChange={(e) => setEditName(e.target.value)}
                                                                        className="bg-[#11221f] border border-primary rounded px-2 py-1 text-sm focus:outline-none w-full"
                                                                    />
                                                                    <button type="submit" className="text-primary hover:text-emerald-400">
                                                                        <span className="material-symbols-outlined">check</span>
                                                                    </button>
                                                                    <button type="button" onClick={() => setEditingCategory(null)} className="text-rose-400">
                                                                        <span className="material-symbols-outlined">close</span>
                                                                    </button>
                                                                </form>
                                                            ) : (
                                                                <span className="font-medium">{cat.name}</span>
                                                            )}
                                                        </td>
                                                        <td className="p-4 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingCategory(cat)
                                                                        setEditName(cat.name)
                                                                    }}
                                                                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                                                                >
                                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(cat.id)}
                                                                    className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-all"
                                                                >
                                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default CategoriesPage
