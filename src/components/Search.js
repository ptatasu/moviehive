import { useRef } from 'react';
import noImg from '../img/poster-holder.jpg';

const Search = ({ movie }) => {
    const searchItem = useRef();
    const imageURL = 'https://image.tmdb.org/t/p/w92';
    const style = { height: 138 + 'px', width: 93 + 'px' };
    const getMovieId = () => {
        let movieId = searchItem.current.getAttribute('id');
        window.location = `/moviehive/#/${movieId}`;
        window.location.reload();
    };
    if (movie.poster_path !== null) {
        return (
            <>
                <div id={movie.id} className='searchItems' ref={searchItem} onClick={getMovieId}>
                    <div className='poster'>
                        <img src={imageURL + movie.poster_path} alt='poster' />
                    </div>
                    <div className='title'>{movie.title}</div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div id={movie.id} className='searchItems' ref={searchItem} onClick={getMovieId}>
                    <div className='poster'>
                        <img src={noImg} alt='poster' style={style} />
                    </div>
                    <div className='title'>{movie.title}</div>
                </div>
            </>
        );
    }
};

export default Search;
