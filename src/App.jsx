import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryProvider } from './providers/QueryProvider'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AddTransactionPage from './pages/AddTransactionPage'
import CMSPage from './pages/CMSPage'
import SettingsPage from './pages/SettingsPage'
import ReportPage from './pages/ReportPage'
import NewProjectPage from './pages/NewProjectPage'
import EditProjectPage from './pages/EditProjectPage'
import EditTransactionPage from './pages/EditTransactionPage'
import CategoriesPage from './pages/CategoriesPage'
import RegisterPage from './pages/RegisterPage'

function App() {
    return (
        <QueryProvider>
            <Toaster position="top-right" />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/project/:id" element={<ProjectDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/add-transaction" element={<AddTransactionPage />} />
                    <Route path="/cms" element={<CMSPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/report" element={<ReportPage />} />
                    <Route path="/project/new" element={<NewProjectPage />} />
                    <Route path="/project/edit/:id" element={<EditProjectPage />} />
                    <Route path="/transaction/edit/:id" element={<EditTransactionPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                </Routes>
            </Router>
        </QueryProvider>
    )
}

export default App

