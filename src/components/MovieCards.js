import { useRef } from 'react';
import chevron from '../img/chevron-right.svg';
import noImg from '../img/poster-holder.jpg';
const MovieCards = ({ movie }) => {
    const imageURL = 'https://image.tmdb.org/t/p/w500';
    const detailsButton = useRef();
    const getMovieId = () => {
        let movieId = detailsButton.current.getAttribute('id');
        window.location = `/moviehive/#/${movieId}`;
        window.location.reload();
    };
    const renderGrid = () => {
        if (movie.poster_path != null) {
            return (
                <>
                    <div className='gridItems moviePoster scale-up-center'>
                        <img className='moviePoster' src={imageURL + movie.poster_path} alt='poster' />
                        <p className='title'>{movie.title}</p>
                        <div id={movie.id} className='seeMore' onClick={getMovieId} ref={detailsButton}>
                            DETAILS
                            <img className='chev' src={chevron} alt='chevronRight' />
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className='gridItems moviePoster scale-up-center'>
                        <img className='moviePoster' src={noImg} alt='poster' />
                        <p className='title'>{movie.title}</p>
                        <div className='seeMore' id={movie.id} onClick={getMovieId} ref={detailsButton}>
                            DETAILS
                            <img className='chev' src={chevron} alt='chevronRight' />
                        </div>
                    </div>
                </>
            );
        }
    };
    return renderGrid();
};

export default MovieCards;
