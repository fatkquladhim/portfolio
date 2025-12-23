function ChatbotButton({ onClick }) {
    return (
        <div className="fixed bottom-6 right-6 z-50 group">
            <button
                onClick={onClick}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-emerald-500 shadow-[0_0_20px_rgba(19,236,200,0.4)] flex items-center justify-center text-background-dark relative hover:scale-110 transition-transform duration-300"
            >
                {/* Pulsing effect rings */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-25 animate-ping"></span>
                <span className="material-symbols-outlined text-3xl relative z-10">smart_toy</span>
            </button>

            {/* Tooltip/Bubble */}
            <div className="absolute bottom-16 right-0 w-64 p-4 rounded-xl glass-panel border-primary/20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                <p className="text-sm font-medium text-white mb-1">Dual AI Assistant</p>
                <p className="text-xs text-white/70">Hi! I can help you navigate the portfolio or analyze financial data if you log in.</p>
            </div>
        </div>
    )
}

export default ChatbotButton
