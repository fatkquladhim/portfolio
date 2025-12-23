function Hero() {
    return (
        <section className="relative min-h-[85vh] flex items-center pt-24 pb-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">

                {/* Hero Text */}
                <div className="flex flex-col gap-6 z-10 animate-in fade-in slide-in-from-left-6 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-xs font-medium text-white/70 tracking-wide uppercase">Available for work</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05] tracking-tight">
                        <span className="text-white">Adhim</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white/80 to-accent-purple">
                            Full-Stack Dev
                        </span>
                    </h1>

                    <p className="text-lg text-white/50 max-w-lg leading-relaxed font-medium">
                        I craft high-performance digital tools and data architectures,
                        merging creative engineering with analytical precision.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="px-8 py-3.5 rounded-lg bg-primary hover:bg-primary-hover text-background-dark font-display font-bold text-base transition-all shadow-[0_0_25px_-5px_rgba(19,236,200,0.4)] hover:scale-105 active:scale-95">
                            Work
                        </button>
                        <button className="px-8 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display font-bold text-base transition-all backdrop-blur-sm hover:scale-105 active:scale-95">
                            Contact
                        </button>
                    </div>

                    {/* Integrated Stats */}
                    <div className="flex items-center gap-8 pt-10 border-t border-white/5 mt-6">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white">5+</span>
                            <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Years</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white">40+</span>
                            <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Projects</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-white">2</span>
                            <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Agents</span>
                        </div>
                    </div>
                </div>

                {/* Hero Visual */}
                <div className="relative flex items-center justify-center z-10 lg:pl-10 animate-in fade-in slide-in-from-right-6 duration-1000 delay-200">
                    {/* Background Glow */}
                    <div className="absolute w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>

                    {/* Character Frame */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent-purple/20 rounded-2xl blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="w-full h-full bg-surface-dark/40 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                            <img
                                alt="Developer 3D Avatar"
                                className="w-full h-full object-cover mix-blend-screen opacity-90 scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpwnjBpYvTVJ1D7ZgKeguMkYDVfsNQqU7KJssZfJWKOg3mg8uSN9juvceaHltLRqIkX3uIkkm7IYWF3CeZOr7ndy2v6xQxWOXD9zig2rNJIZ6wZwqCj4_1cplOudcmtyBhstcpIzJ1QUN0AMzoC8daMXYlc-Nv61A6urFHZMsnLDizaICpFJCyydUytEBooFGsBeSeLbSyatAWX3fGZqDd8FTRnaBeL5Gd0wXiVtj5td495v-kyoK4dn7CBgLJ1lstCgCzWq51u8k"
                            />
                            {/* Overlay Glass effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent pointer-events-none"></div>
                        </div>

                        {/* Floating elements for "Pop" */}
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 backdrop-blur-md rounded-xl border border-primary/20 flex items-center justify-center animate-bounce-slow">
                            <span className="material-symbols-outlined text-primary text-xl">code</span>
                        </div>
                        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-purple/20 backdrop-blur-md rounded-xl border border-accent-purple/20 flex items-center justify-center animate-bounce-slow animation-delay-1000">
                            <span className="material-symbols-outlined text-accent-purple text-xl">database</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Hero
