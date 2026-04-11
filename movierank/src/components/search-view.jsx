import React, { useState } from 'react';
import MovieDetails from "./movie-details.jsx";

const SearchView = ({ movies, onRate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        setSelectedMovie(null);
        setResults([]);

        if (!searchTerm.trim()) return;

        const filtered = movies.filter(m =>
            m.original_title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filtered.length === 0) {
            setError('אין סרט כזה');
        } else if (filtered.length === 1) {
            setSelectedMovie(filtered[0]);
        } else {
            setResults(filtered);
            setError('נמצאו מספר סרטים, בחר אחד:');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-12 animate-in fade-in duration-500">
            <div className="flex flex-col items-end gap-6">
                <form onSubmit={handleSearch} className="relative w-full max-w-2xl flex gap-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="...חפש סרט"
                        className="w-full bg-white/[0.03] border border-white/10 p-5 rounded-2xl outline-none focus:border-white/20 text-white text-xl text-right transition-all"
                    />
                    <button
                        type="submit"
                        className="bg-white text-black px-10 rounded-2xl font-black uppercase hover:bg-gray-200 transition-all"
                    >
                        Search
                    </button>
                </form>

                {error && (
                    <div className="px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
                        <p className="text-red-400 font-bold text-xs text-right">{error}</p>
                    </div>
                )}

                {results.length > 1 && (
                    <div className="w-full max-w-2xl">
                        <select
                            value={selectedMovie?.id || ""}
                            onChange={(e) => {
                                const movie = results.find(m => m.id.toString() === e.target.value);
                                setSelectedMovie(movie);
                            }}
                            className="w-full bg-[#1a1c20] border border-white/10 p-4 rounded-2xl outline-none text-white text-right cursor-pointer"
                        >
                            <option value="" disabled>-- בחר סרט מהרשימה --</option>
                            {results.map(m => (
                                <option key={m.id} value={m.id}>
                                    {m.original_title}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="w-full">
                {selectedMovie ? (
                    <div className="relative">
                        <button
                            onClick={() => {
                                setSelectedMovie(null);
                                setResults([]);
                                setError('');
                                setSearchTerm('');
                            }}
                            className="absolute -top-12 left-0 text-gray-500 hover:text-white text-xs font-bold uppercase"
                        >
                            ← Back to search
                        </button>
                        <MovieDetails movie={selectedMovie} onRate={onRate}/>
                    </div>
                ) : (
                    <div className="h-80 flex items-center justify-center border border-white/5 bg-white/[0.01] rounded-[40px] border-dashed">
                        <span className="text-gray-600 uppercase tracking-[0.4em] text-[10px] font-black">
                            Waiting for selection
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchView;