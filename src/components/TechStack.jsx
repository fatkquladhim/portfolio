import { useState } from 'react';

const skills = [
    { name: 'JavaScript', category: 'dev', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDS8YS3GnhX2z1mMLkHRTLaZBWdyvB9nqU8clYvCNiYgKR2dz3SiKCva92zyQ9aJVzuUTu13QwuLHHxE-xSXWSbZ9Af5qD2KZLX9ycnlliFb-hqHS8JQYKmB70jWnhbA2NLRLnevqbqVHutIbHjZpdujTRyA7N_1Ii7i1oxlTlzMb4yCBs4JUHNxTkvs4gxC_FEDdtKnQLpChekx-ZO70QFwxqXo56hE32x-IUZkVWiswUi3k3xOmGjQ6Y8OSuuHwjzSU2QUGyi9rI' },
    { name: 'TypeScript', category: 'dev', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFldj8a4xvfVjLpmEpeHqhgSI98lGdrJkwg90YHCzhsefWxSqXYX7Lq-Qr7pYJtW0xqxolXd4UuKctGR0Pjm1_uQigYnn1gEv59ORI0CtWbRd_tTuI2pzXmsZBqvsEjBHflGAARw79bY3KvTgGPyMW3HF0Mdla0OIjm6PoWR7jtTndDh5w6JCVjYM7RxWXENdn8S2HN0FCMbacscH5rGJ8YGfSaEmBeptaAcwFLGtwkJCVna6ILRU_IIGAH948EEh3f2ULUiaAg0w' },
    { name: 'React', category: 'dev', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB62VB4rbhF3-Xd8ncwcT1aXzIEEe7ml88XLf4g-QZ0P3usm9Tmz81_rhrQNmIFT1IfE6lXQvkKGDVEFR6gb-Mj1oaAdzQA40xcPPk4eXq1anlR1_gVxu-gg7o_i5hjkgfuQ_W_lbDMDFvGOzsY_30FZHBPU2ufIe0H01ymREEXeQVEnOmIb4ikmaa9uR6hG9_FD9jIekE9YxZFDpNeNP6U5xQmnfomav7iSp2TuIbHeHqWMXUQRnUnJOkw8s-8z6fXcH1C57_RFAc' },
    { name: 'Next.js', category: 'dev', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5huOT9YLnfpQ7DrxVDjMmT3LEywOKmEyPicHZvBXor4RgHE1GoCKKLrIf1PF9oC8F1EkqHKsNg9QC8r3xY2XAkIYijbWgGgB252UsX4QrRL2-FDeKGt3aBtStShQg-qV_3j2mTBBvpEYL4RDxWlCa2_g3uTFXD8g7hp7NklHVfk3vFfxIpmfjR0b2PZSMoCk0TSevKCqDGX-UFv0Iq84NNJiu4vaTulolGegaI-nFvpBOxkEvlwNoi7B0TjnSpddi3-OEVFbVKx4', extraClass: 'bg-white rounded-full p-0.5' },
    { name: 'Tailwind', category: 'dev', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBV8-cyHu2mbIChwqLKwwwtxT0plaUPHBMhi-n4phxNgA4WD6tDLC-f_7YJyxymHiIfgrKpCb0w6Fc-8pz6CHS31RPlmWdcBZ4EQlUZNXsNK4x-QOD1CokOzOY2eAuYJgXbI4Iy4Tsi7AOawjajFSVi7SrZHyox6xAM--QmcpqSg610KUCa_KwHaGLTfC--e9ZgEwylqCMjdBt5c72jPOxiOUsj20K5rzX5Pf5ZtSjtggCFVk7kdyoQ0TAnPHYa2Xzhqxb5SkQsb7U' },
    { name: 'Python', category: 'dev', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOpv59yTs8qvwCVa9ly8T5cH70XQZB9E0z62p9ZDjzlZIZNh3N1YCg6BwRF5doFLqMcFpN-bz78PgJlRXitqg0X4qp0QoTfVItZj9b2__8mEJ7-7FxGuejvA7y65wLmbsnnvI0zoUwHLl3WuwnOz2ArbcmG3Ex1nNPsZo5W22CirQ3sjL9qIGSmW8xuEpTxps6-Uy4-n2yhPu0Fn4pGsyfbi6li-WW9VteOq435mUr8fSo7LeiSQISiRnH25QVq_NbswMOMEQbfT4' },
    { name: 'Data Analysis', category: 'finance', icon: 'candlestick_chart', iconClass: 'text-emerald-400' },
    { name: 'OpenAI API', category: 'ai', icon: 'smart_toy', iconClass: 'text-accent-purple' },
];

function TechStack() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredSkills = skills.filter((skill) => {
        if (activeCategory === 'all') return true;
        return skill.category === activeCategory;
    });

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'dev', label: 'Dev' },
        { id: 'finance', label: 'Finance' },
        { id: 'ai', label: 'AI' },
    ];

    return (
        <section className="py-20 bg-surface-dark/30 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-display font-bold text-white mb-2">My Tech Arsenal</h2>
                        <p className="text-white/60">Tools I use to build the future.</p>
                    </div>

                    {/* Category Toggle */}
                    <div className="bg-black/20 p-1 rounded-lg flex gap-1 self-start md:self-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${activeCategory === cat.id
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredSkills.map((skill) => (
                        <div
                            key={skill.name}
                            className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-all group cursor-default"
                        >
                            {skill.image ? (
                                <img
                                    alt={skill.name}
                                    className={`w-10 h-10 group-hover:scale-110 transition-transform ${skill.extraClass || ''
                                        }`}
                                    src={skill.image}
                                />
                            ) : (
                                <span
                                    className={`material-symbols-outlined text-4xl ${skill.iconClass || ''
                                        } group-hover:scale-110 transition-transform`}
                                >
                                    {skill.icon}
                                </span>
                            )}
                            <span className="text-sm font-medium text-white/80">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TechStack;