function Footer() {
    return (
        <footer className="border-t border-white/5 bg-background-dark pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col items-center md:items-start gap-1">
                    <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-white">Adhim Dev</span>
                    </div>
                    <p className="text-xs text-white/40">© 2023 Adhim Dev. All rights reserved.</p>
                </div>

                <div className="flex gap-8 text-sm text-white/50">
                    <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                    <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
