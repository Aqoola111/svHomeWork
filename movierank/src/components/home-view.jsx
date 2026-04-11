import React from 'react';
import MovieDetails from "./movie-details.jsx";

const HomeView = ({movies, mostPopular, onRate}) => {

    return (
        <div className="flex gap-10 w-full items-start">
            <div className="flex-3">
                <MovieDetails movie={mostPopular} onRate={onRate}/>
            </div>

            <aside className='flex-1 flex flex-col gap-6 sticky top-0'>
                <h2 className='text-xs uppercase tracking-[0.3em] text-gray-500 font-bold mb-2'>
                    Recommended
                </h2>
                <div className='flex flex-col gap-4'>
                    {movies.map((movie) => (
                        <div key={movie.id}
                             className="flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
                            <div
                                className='w-16 h-20 bg-cover bg-center rounded-lg shadow-lg flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300'
                                style={{backgroundImage: `url(${movie.poster_path})`}}
                            />
                            <span
                                className='text-sm font-medium text-gray-500 group-hover:text-white truncate transition-colors'>
                                {movie.original_title}
                            </span>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
};

export default HomeView;