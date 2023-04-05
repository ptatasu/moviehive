import { useRef } from 'react';

const Recommendations = ({ movie }) => {
    const recommended = useRef();
    const getMovieId = () => {
        let movieId = recommended.current.getAttribute('id');
        window.location = `/moviehive/#/${movieId}`;
        window.location.reload();
    };
    const imageURL = 'https://image.tmdb.org/t/p/w500';
    return (
        <>
            <div id={movie.id} className='gridItems scale-up-center' onClick={getMovieId} ref={recommended}>
                <img className='moviePoster' src={imageURL + movie.poster_path} alt='poster' />
                <p className='title'>{movie.title}</p>
            </div>
        </>
    );
};

export default Recommendations;
