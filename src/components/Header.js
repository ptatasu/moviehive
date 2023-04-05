import React, { useState } from 'react';
import logo from '../img/hive.svg';
import axios from 'axios';
import Search from './Search';

const Header = () => {
    let [movies, setMovies] = useState([]);
    const movieURL = 'https://api.themoviedb.org/3';
    const searchMovie = async (query) => {
        const res = await axios.get(`${movieURL}/search/movie`, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                query: query,
            },
        });
        const data = res.data;
        setMovies(data.results);
    };
    let count = 0;
    const renderSearch = () =>
        movies.map((movie) => {
            if (count < 8) {
                count++;
                return <Search key={movie.id} movie={movie} />;
            } else {
                return null;
            }
        });
    return (
        <>
            <nav className='navbar'>
                <div className='logo'>
                    <img src={logo} alt='logo' />
                </div>
                <div className='searchBar'>
                    <input
                        className='search'
                        type='text'
                        onChange={(e) => {
                            searchMovie(e.target.value);
                        }}
                        placeholder='Search'
                    />
                </div>
                <div className='searchResults'>{movies[0] ? renderSearch() : null}</div>
            </nav>
        </>
    );
};

export default Header;
