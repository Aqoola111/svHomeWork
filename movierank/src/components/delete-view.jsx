import React, { useState } from 'react';

const DeleteView = ({ movies, setMovies }) => {
    const [movieTitle, setMovieTitle] = useState('');
    const [notification, setNotification] = useState({ type: '', msg: '' });

    const showFeedback = (msg, type) => {
        setNotification({ msg, type });
        setTimeout(() => setNotification({ type: '', msg: '' }), 3000);
    };

    const handleDelete = (e) => {
        e.preventDefault();

        if (!movieTitle.trim()) return;

        const movieExists = movies.find(
            m => m.original_title.toLowerCase() === movieTitle.trim().toLowerCase()
        );

        if (movieExists) {
            setMovies(prev => prev.filter(m => m.id !== movieExists.id));
            showFeedback(`Movie "${movieExists.original_title}" deleted`, 'success');
            setMovieTitle('');
        } else {
            showFeedback('אין סרט כזה', 'error');
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {notification.msg && (
                <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-2xl border backdrop-blur-xl animate-in zoom-in duration-300 ${
                    notification.type === 'success'
                        ? 'bg-green-500/20 border-green-500/50 text-green-400'
                        : 'bg-red-500/20 border-red-500/50 text-red-400'
                }`}>
                    <span className="font-black uppercase tracking-widest">{notification.msg}</span>
                </div>
            )}

            <div className="flex flex-col gap-10 bg-white/5 p-12 rounded-[40px] border border-white/10 shadow-2xl">
                <div className="text-center">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Delete Movie</h2>
                    <p className="text-gray-500 text-sm uppercase tracking-[0.2em]">Enter full title to remove</p>
                </div>

                <form onSubmit={handleDelete} className="flex flex-col gap-6">
                    <div className="relative group">
                        <input
                            type="text"
                            value={movieTitle}
                            onChange={(e) => setMovieTitle(e.target.value)}
                            placeholder="Exact Movie Title..."
                            className="w-full bg-black/20 border border-white/10 p-6 rounded-2xl outline-none focus:border-red-500/50 text-white text-center text-xl transition-all placeholder:text-gray-700"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-[0.3em] py-6 rounded-2xl transition-all active:scale-95 shadow-lg shadow-red-900/20"
                    >
                        Confirm Deletion
                    </button>
                </form>

                <div className="flex justify-center gap-2 opacity-20">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
            </div>
        </div>
    );
};

export default DeleteView;