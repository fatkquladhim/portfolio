// src/components/AIAssistantPanel.jsx
import React, { useState, useRef, useEffect } from 'react';

function AIAssistantPanel({
    isOpen,
    onClose,
    onToggle,
    title = "AI Assistant",
    initialMessage = "Hello! How can I help you today?",
    accentColor = "primary", // "primary" or "accent-purple"
    mode = "finance" // "finance" or "portfolio"
}) {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: initialMessage }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (!isOpen) return null;

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Add placeholder for assistant response
        setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

            // Add system context based on mode
            const systemContext = mode === 'finance'
                ? "You are a finance assistant. Help users analyze their spending and financial data."
                : "You are a portfolio assistant. Help users learn about Adhim's projects, skills, and experience.";

            const response = await fetch(`${baseUrl}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: systemContext },
                        ...messages,
                        userMessage
                    ]
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.replace('data: ', '').trim();
                        if (dataStr === '[DONE]') break;

                        try {
                            const data = JSON.parse(dataStr);
                            if (data.content) {
                                accumulatedContent += data.content;
                                setMessages(prev => {
                                    const newMessages = [...prev];
                                    newMessages[newMessages.length - 1].content = accumulatedContent;
                                    return newMessages;
                                });
                            }
                        } catch (err) {
                            console.error('Error parsing stream chunk:', err);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = 'Sorry, I encountered an error. Please try again.';
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const colorClass = accentColor === 'accent-purple' ? 'text-accent-purple' : 'text-primary';
    const bgOpacityClass = accentColor === 'accent-purple' ? 'bg-accent-purple/20' : 'bg-primary/20';
    const borderOpacityClass = accentColor === 'accent-purple' ? 'border-accent-purple/20' : 'border-primary/20';
    const ringClass = accentColor === 'accent-purple' ? 'focus:border-accent-purple/50 focus:ring-accent-purple/50' : 'focus:border-primary/50 focus:ring-primary/50';

    return (
        <aside className="xl:flex flex-col w-80 h-full border-l border-white/5 bg-[#13161c] shrink-0 relative z-20 animate-in slide-in-from-right-4 duration-300 shadow-2xl">
            <div className={`absolute inset-0 bg-gradient-to-b from-${accentColor === 'primary' ? 'primary' : 'accent-purple'}/5 to-transparent pointer-events-none`}></div>
            <div className="p-5 border-b border-white/5 flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined ${colorClass}`}>smart_toy</span>
                    <h3 className="text-white font-medium">{title}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onToggle}
                        className="text-slate-500 hover:text-white transition-colors"
                        aria-label="Minimize"
                    >
                        <span className="material-symbols-outlined">horizontal_rule</span>
                    </button>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-white transition-colors"
                        aria-label="Close"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 custom-scrollbar">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {msg.role === 'assistant' && (
                            <div className={`size-8 rounded-full ${bgOpacityClass} flex items-center justify-center ${colorClass} shrink-0`}>
                                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                            </div>
                        )}
                        <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user'
                                ? `${bgOpacityClass} text-white border ${borderOpacityClass} rounded-tr-none`
                                : 'bg-white/5 text-slate-300 rounded-tl-none'
                            }`}>
                            <p className="whitespace-pre-wrap">{msg.content || (isLoading && index === messages.length - 1 ? '...' : '')}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/5 z-10 bg-[#13161c]">
                <form onSubmit={handleSendMessage} className="relative">
                    <input
                        className={`w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-4 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${ringClass}`}
                        placeholder={mode === 'finance' ? "Ask about your finances..." : "Ask about projects or experience..."}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className={`absolute right-2 top-2 p-1 rounded transition-colors ${isLoading || !input.trim() ? 'text-slate-600' : `${colorClass} hover:${bgOpacityClass}`
                            }`}
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {isLoading ? 'hourglass_empty' : 'send'}
                        </span>
                    </button>
                </form>
            </div>
        </aside>
    );
}

export default AIAssistantPanel;
