const MovieCard = ({ title, imgSrc }) => {
    return (
        <div
            className="relative w-48 h-48 rounded-lg bg-cover bg-center overflow-hidden flex items-end"
            style={{ backgroundImage: `url(${imgSrc})` }}
        >
            <div className="w-full bg-black/60 p-2">
                <p className="text-white text-sm text-center truncate">
                    {title}
                </p>
            </div>
        </div>
    );
};

export default MovieCard;