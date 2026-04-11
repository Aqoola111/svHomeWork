import React, { useState } from 'react';

const AddMovieView = () => {
    const [formData, setFormData] = useState({ title: '', image: '', description: '' });
    const [notification, setNotification] = useState(null);

    const triggerFeedback = (msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            triggerFeedback('Fill all fields', 'error');
            return;
        }

        const isEnglish = (str) => /^[a-zA-Z0-9\s\t\n\r./*-+!@#$%^&()]*$/.test(str);
        if (!isEnglish(formData.title) || !isEnglish(formData.description)) {
            triggerFeedback('English only', 'error');
            return;
        }

        setFormData({ title: '', image: '', description: '' });
        triggerFeedback('Movie Added!', 'success');
    };

    return (
        <div className="max-w-2xl w-full mx-auto relative px-4">
            {notification && (
                <div
                    className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-2xl border backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300 ${
                        notification.type === 'success'
                            ? 'bg-green-500/20 border-green-500/50 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                            : 'bg-red-500/20 border-red-500/50 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                    }`}>
                    <span className="font-black uppercase tracking-widest">{notification.msg}</span>
                </div>
            )}

            <h2 className="text-4xl font-black uppercase italic mb-10 text-white tracking-tighter">Add Movie</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-white/40 text-white transition-all"
                        placeholder="Movie Title..."
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Poster URL</label>
                    <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-white/40 text-white transition-all"
                        placeholder="https://..."
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        maxLength="200"
                        className="bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-white/40 text-white transition-all h-40 resize-none"
                        placeholder="Short story..."
                    />
                    <div className="text-right text-[10px] text-gray-600 font-bold mt-1 uppercase tracking-tighter">
                        {formData.description.length} / 200
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-white text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-gray-200 active:scale-95 transition-all shadow-xl shadow-white/5"
                >
                    Create Entry
                </button>
            </form>
        </div>
    );
};

export default AddMovieView;