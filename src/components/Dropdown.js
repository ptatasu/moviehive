import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MovieCards from './MovieCards';
import { ScaleLoader } from 'react-spinners';

const Dropdown = () => {
    const movieURL = 'https://api.themoviedb.org/3';

    let [sort, setSort] = useState('popularity.desc');
    const mainTitle = useRef();
    let [movies, setMovies] = useState([]);
    let [loading, setLoading] = useState(false);
    useEffect(() => {
        getData(sort);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        // setTimeout(() => {
        //     random(mainTitle);
        // }, 6000);
    }, []);

    const getData = async (query) => {
        if (query === 'now_playing') {
            const res = await axios.get(`${movieURL}/movie${query}`, {
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    language: 'en-US',
                },
            });
            const data = res.data;
            setMovies(data.results);
            return data;
        } else {
            const res = await axios.get(`${movieURL}/discover/movie`, {
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    sort_by: query,
                    include_adult: 'false',
                    language: 'en-US',
                    primary_release_year: '2023',
                    watch_region: 'PHL',
                },
            });
            const data = res.data;
            setMovies(data.results);
            return data;
        }
    };
    // const random = (data) => {
    //     let origData = data.current.innerHTML;
    //     const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //     let i = 0;
    //     let timeout = setInterval(() => {
    //         data.current.innerHTML = data.current.innerHTML
    //             .split('')
    //             .map((letter, index) => {
    //                 if (index < i) {
    //                     return origData[index];
    //                 } else {
    //                     return letters[Math.floor(Math.random() * 26)];
    //                 }
    //             })
    //             .join('');
    //         if (i > data.current.innerHTML.length) {
    //             clearInterval(timeout);
    //         }
    //         i += 1 / 3;
    //     }, 30);
    // };

    const getSort = (e) => {
        setSort(e);
        getData(e);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const renderData = () => movies.map((movie) => <MovieCards key={movie.id} movie={movie} />);
    const style = { margin: '40vh 0' };

    return (
        <>
            <h1 className='title' ref={mainTitle}>
                DISCOVER MOVIES
            </h1>
            <div className='dropDown'>
                <p>SORTED BY </p>
                <div className='dropDownMenu'>
                    <form name='sorter'>
                        <select name='sort' id='sort' onChange={(e) => getSort(e.target.value)}>
                            <option value='popularity.desc'>Popularity</option>
                            <option value='primary_release_date.desc'>Latest</option>
                            {/* <option value='vote_average.desc'>Score</option> */}
                        </select>
                    </form>
                </div>
            </div>
            {loading ? (
                <>
                    <div className='loading'></div>
                    <center style={style}>
                        <ScaleLoader color='#C2BC4F' height={45} margin={2} radius={2} speedMultiplier={1} width={4} />
                    </center>
                </>
            ) : (
                <>
                    <div className='container'>
                        <div className='grid'>{renderData()}</div>
                    </div>
                </>
            )}
        </>
    );
};
export default Dropdown;
