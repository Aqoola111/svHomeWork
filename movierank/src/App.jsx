import './App.css'
import {useEffect, useMemo, useState} from "react";
import AddMovieView from "./components/add-movie-view.jsx";
import DeleteView from "./components/delete-view.jsx";
import HomeView from "./components/home-view.jsx";
import MovieCard from "./components/movie-card.jsx";
import {NavLink, Routes, Route} from "react-router-dom";
import SearchView from "./components/search-view.jsx";

const API_URL = "https://jsonfakery.com/movies/random/20"
const randomNumber = Math.random()

const NAV_ITEMS = [
    {name: 'Home', path: '/'},
    {name: 'Add', path: '/add'},
    {name: 'Delete', path: '/delete'},
    {name: 'Search', path: '/search'}
]

function App() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        if (movies.length === 0) {
            fetch(API_URL)
                .then(res => res.json())
                .then(data => setMovies(data));
        }
    }, []);

    const topMovies = useMemo(() => {
        return [...movies]
            .sort((a, b) => b.vote_average - a.vote_average)
            .slice(0, 3);
    }, [movies]);

    const topMovie = useMemo(() => {
        return [...movies]
            .sort((a, b) => b.vote_average - a.vote_average)[0]
    }, [movies]);

    const handleRate = (movieId, newStarRating) => {
        console.log(`Rated movie ID ${movieId} with ${newStarRating} stars`);
        setMovies(prevMovies => prevMovies.map(movie => {
            if (movie.id === movieId) {
                const currentCount = movie.vote_count || 0;
                const currentAvg = movie.vote_average || 0;

                const newCount = currentCount + 1;
                const newAvg = ((currentAvg * currentCount) + newStarRating) / newCount;

                return {
                    ...movie,
                    vote_average: Number(newAvg.toFixed(1)), // Округляем до десятых
                    vote_count: newCount
                };
            }
            return movie;
        }));
    };

    const randomFive = useMemo(() => {
        return [...movies]
            .sort(() => 0.5 - randomNumber)
            .slice(0, 5)
            .sort((a, b) => a.original_title.localeCompare(b.original_title));
    }, [movies]);

    return (
        <div className='min-h-screen bg-[#0f1115] text-white px-10 py-12 font-sans'>
            <div className='max-w-[1400px] mx-auto flex flex-col gap-12'>
                <header className='flex flex-col items-center gap-8'>
                    <h1 className='text-5xl font-black tracking-tighter uppercase italic text-white'>
                        Best Movie
                    </h1>
                    <nav className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({isActive}) => `
                                    px-8 py-2.5 rounded-lg text-sm font-medium transition-all
                                    ${isActive ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white'}
                                `}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </header>
                <section className="flex justify-center gap-8">
                    {topMovies.map(movie => (
                        <div key={movie.id}
                             className="transform hover:-translate-y-2 transition-transform duration-300">
                            <MovieCard
                                title={movie.original_title}
                                imgSrc={movie.poster_path}
                            />
                        </div>
                    ))}
                </section>
                <main className='flex gap-16 mt-8'>

                    <Routes>
                        <Route path="/"
                               element={<HomeView movies={randomFive} mostPopular={topMovie} onRate={handleRate}/>}/>
                        <Route path="/add" element={<AddMovieView/>}/>
                        <Route path="/delete" element={<DeleteView movies={movies} setMovies={setMovies}/>}/>
                        <Route path="/search" element={<SearchView movies={movies} onRate={handleRate}/>}/>
                    </Routes>

                </main>

            </div>
        </div>
    )
}

export default App