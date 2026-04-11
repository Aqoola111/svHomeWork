import React, {useState} from 'react';

const MovieDetails = ({movie, onRate}) => {
    const [hoveredStar, setHoveredStar] = useState(0);
    const [rated, setRated] = useState(-1);

    if (!movie) return <div className="text-gray-500">Select a movie...</div>;

    return (
        <div
            className="flex flex-col items-center gap-8 p-10 bg-white/5 rounded-[32px] border border-white/10 w-full animate-in fade-in duration-500">
            <h2 className="text-2xl font-medium">
                <span className="text-gray-500 italic">movie name:</span>
                <span className="ml-3 text-white font-black uppercase tracking-wider">
                    {movie.original_title}
                </span>
            </h2>

            <div
                className="w-full max-w-[320px] aspect-[2/3] overflow-hidden rounded-2xl shadow-2xl border border-white/5">
                <img
                    className="w-full h-full object-cover"
                    src={movie.poster_path}
                    alt={movie.original_title}
                />
            </div>

            <p className="text-gray-400 text-center max-w-xl leading-relaxed italic text-lg">
                {movie.overview}
            </p>

            <div className="w-full flex justify-end items-center gap-6 mt-4 border-t border-white/5 pt-8">
                <div className="flex flex-col items-end gap-2">
                    <div
                        className="flex gap-1"
                        onMouseLeave={() => setHoveredStar(0)}
                    >
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onMouseEnter={() => setHoveredStar(star)}
                                onClick={() => {
                                    onRate(movie.id, star);
                                    setRated(star);
                                }}
                                className={`text-4xl transition-all hover:scale-110 active:scale-95 ${
                                    (hoveredStar ? star <= hoveredStar : star <= rated)
                                        ? 'text-yellow-400'
                                        : 'text-gray-800'
                                }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    {rated > 0 && (
                        <span className="text-[10px] text-yellow-500/50 uppercase font-bold tracking-widest mr-1">
                            Your rating: {rated}
                        </span>
                    )}
                </div>

                <div className="flex flex-col items-end min-w-[80px]">
                    <div className="flex items-center gap-2">
                        <span className="text-4xl font-black text-yellow-500 leading-none">
                            {movie.vote_average?.toFixed(1)}
                        </span>
                        <span className="text-yellow-500 text-xl">★</span>
                    </div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold mt-1 tracking-widest">
                        Average
                    </span>
                </div>
            </div>
        </div>
    );
};


export default MovieDetails;