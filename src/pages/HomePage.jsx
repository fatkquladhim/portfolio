import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TechStack from '../components/TechStack'
import Projects from '../components/Projects'
import ContactCTA from '../components/ContactCTA'
import Footer from '../components/Footer'
import ChatbotButton from '../components/ChatbotButton'
import AIAssistantPanel from '../components/AIAssistantPanel'

function HomePage() {
    const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

    const toggleAIAssistant = () => {
        setIsAIAssistantOpen(!isAIAssistantOpen);
    };

    return (
        <div className="min-h-screen">
            {/* Background Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="floating-orb w-[500px] h-[500px] bg-primary/20 top-[-10%] left-[-10%]"></div>
                <div className="floating-orb w-[400px] h-[400px] bg-accent-purple/20 bottom-[10%] right-[-5%] animation-delay-2000"></div>
            </div>

            <Navbar />
            <Hero />
            <TechStack />
            <Projects />
            <ContactCTA />
            <Footer />

            <ChatbotButton onClick={toggleAIAssistant} />

            {/* AI Assistant Overlay for Home Page */}
            {isAIAssistantOpen && (
                <div className="fixed inset-y-0 right-0 z-[60] flex shadow-2xl">
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm xl:hidden"
                        onClick={() => setIsAIAssistantOpen(false)}
                    />
                    <AIAssistantPanel
                        isOpen={true}
                        onClose={() => setIsAIAssistantOpen(false)}
                        onToggle={() => setIsAIAssistantOpen(false)}
                        title="Portfolio Guide"
                        accentColor="accent-purple"
                        mode="portfolio"
                        initialMessage="Hi! I'm Adhim's AI assistant. I can tell you about his projects, technical expertise, or professional background. What would you like to know?"
                    />
                </div>
            )}
        </div>
    )
}

export default HomePage
