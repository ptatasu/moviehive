import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import YouTube from 'react-youtube';
import Swal from 'sweetalert2';
import Recommendations from './Recommendations';
import axios from 'axios';
import back from '../img/arrow_back.svg';
import home from '../img/home.svg';
import close from '../img/close.svg';

const MovieDetails = () => {
    const { id } = useParams();
    const mainTitle = useRef();
    const movieURL = 'https://api.themoviedb.org/3';
    const imageURL = 'https://image.tmdb.org/t/p/w1280';
    let [details, setDetails] = useState([]);
    let [genre, setGenre] = useState([]);
    let [recomm, setRecomm] = useState([]);
    let [loading, setLoading] = useState(false);
    let [play, setPlay] = useState(false);
    window.scrollTo(0, 0);
    useEffect(() => {
        (async () => {
            const data = await getMovieDetails(id);
            const recommendations = await getMovieRecommendations(id);
            if (recommendations.results.length !== 0) {
                setRecomm(recommendations.results);
            } else {
                setRecomm(null);
            }
            setDetails(data);
            setGenre(data.genres);
        })();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        // setTimeout(() => {
        //     random(mainTitle);
        // }, 1500);
    }, []);

    const random = (data) => {
        let origData = data.current.innerHTML;
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let i = 0;
        let timeout = setInterval(() => {
            data.current.innerHTML = data.current.innerHTML
                .split('')
                .map((letter, index) => {
                    if (index < i) {
                        return origData[index].toUpperCase();
                    } else {
                        return letters[Math.floor(Math.random() * 26)];
                    }
                })
                .join('');
            if (i > data.current.innerHTML.length) {
                clearInterval(timeout);
            }
            i += 1 / 3;
        }, 30);
    };

    const getMovieDetails = async (query) => {
        const res = await axios.get(`${movieURL}/movie/${query}`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en-US',
                append_to_response: 'videos',
            },
        });
        const data = await res.data;
        return data;
    };
    const getMovieRecommendations = async (query) => {
        const res = await axios.get(`${movieURL}/movie/${query}/recommendations`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                language: 'en-US',
                append_to_response: 'videos',
            },
        });
        const data = await res.data;
        return data;
    };

    const getGenres = () => {
        let genres = '';
        genre.map((genre) => (genres += genre.name + ' '));
        return genres;
    };
    const goBack = () => {
        window.history.back();
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };
    const goHome = () => {
        window.location = '/moviehive';
    };

    const getBackdrop = () => {
        if (details.backdrop_path == null) {
            return <p className='backdrop no-img'>Sorry, There's no Cover for this</p>;
        } else {
            return <img className='backdrop scale-up-center' src={imageURL + details.backdrop_path} alt='cover' />;
        }
    };
    const renderTrailer = () => {
        const trailer = details.videos.results.find((vid) => vid.name === 'Official Trailer');
        const noTrailer = details.videos.results[0] ? details.videos.results[0].key : null;
        const videoId = trailer ? trailer.key : null;
        if (noTrailer || videoId) {
            return (
                <>
                    <div className='close' onClick={trailerOff}>
                        <img src={close} alt='close' />
                    </div>
                    <div className='wrapper'>
                        <YouTube
                            videoId={videoId ? videoId : noTrailer}
                            className='youtube-container'
                            iframeClassName='trailer'
                            opts={{ width: '1280', height: '720', playerVars: { autoplay: 1, controls: 0, disablekb: 1, modestbranding: 1, rel: 0 } }}
                        />
                    </div>
                </>
            );
        } else {
            Swal.fire({
                icon: 'error',
                titleText: 'Sorry...',
                text: "There's no Trailer Found",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                confirmButtonText: 'Back',
                confirmButtonColor: '#C2BC4F',
            });
            return <div className='gradient'></div>;
        }
    };
    let count = 0;
    const renderData = () =>
        recomm.map((movie) => {
            if (count < 5) {
                if (movie.poster_path !== null) {
                    count++;
                    return <Recommendations key={movie.id} movie={movie} />;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        });
    const noRecomm = () => {
        return <h2 className='noRecomm'>Sorry, There's no Recommendation for this Movie</h2>;
    };
    const trailerOn = () => {
        setPlay(true);
    };
    const trailerOff = () => {
        setPlay(false);
    };
    const style = { margin: '50vh 0' };
    return (
        <>
            {loading ? (
                <>
                    <div className='loading'></div>
                    <center style={style}>
                        <ScaleLoader color='#C2BC4F' height={45} margin={2} radius={2} speedMultiplier={1} width={4} />
                    </center>
                </>
            ) : (
                <>
                    {details.videos && play ? (
                        renderTrailer()
                    ) : (
                        <>
                            <div className='gradient'></div>
                        </>
                    )}

                    {getBackdrop()}
                    <img className='btn back' src={back} alt='arrow_back' onClick={goBack} />
                    <img className='btn home' src={home} alt='arrow_back' onClick={goHome} />
                    <div className='movieContainer'>
                        <h1 className='mainTitle' ref={mainTitle}>
                            {details.original_title}
                        </h1>
                        {/* Shoukd be positioned relative */}
                        <p className='overview'>{details.overview}</p>
                        <p className='genres'>Genres: {getGenres()}</p>
                        <p className='release'>Release Date: {details.release_date}</p>
                        <p className='status'>Status: {details.status}</p>
                    </div>
                    <div className='btn trailer' onClick={trailerOn}>
                        PLAY TRAILER
                    </div>
                    <div className='recommendation'>
                        <p className='RecomTitle'>Recommendations</p>
                        {recomm ? renderData() : noRecomm()}
                    </div>
                </>
            )}
        </>
    );
};

export default MovieDetails;
