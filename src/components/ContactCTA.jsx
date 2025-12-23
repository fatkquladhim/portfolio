import { useState } from 'react';
import { useCreateInquiry } from '../hooks/useInquiries';
import toast from 'react-hot-toast';

function ContactCTA() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const { mutate: createInquiry, isLoading } = useCreateInquiry();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        createInquiry(formData, {
            onSuccess: () => {
                toast.success('Message sent! I will get back to you soon.');
                setShowForm(false);
                setFormData({ name: '', email: '', message: '' });
            },
            onError: (error) => {
                toast.error(error.response?.data?.error || 'Failed to send message. Please try again.');
            }
        });
    };

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Ready to collaborate?</h2>
                <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
                    Whether you need a full-stack developer for your next big idea or a financial tech consultant, I'm just a message away.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {!showForm ? (
                        <button
                            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-background-dark font-display font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(19,236,200,0.5)]"
                            onClick={() => setShowForm(true)}
                        >
                            <span className="material-symbols-outlined">mail</span>
                            Send Email
                        </button>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-lg mx-auto p-6 glass-panel rounded-2xl border border-white/10 backdrop-blur-sm bg-white/5"
                        >
                            <h3 className="text-xl font-display font-bold text-white mb-4">Send me a message</h3>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                ></textarea>
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-3 rounded-lg bg-primary hover:bg-primary-hover text-background-dark font-display font-bold transition-all disabled:opacity-50"
                                    >
                                        {isLoading ? 'Sending...' : 'Send'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-display transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ContactCTA;