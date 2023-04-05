import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Dropdown from './components/Dropdown';
import MovieDetails from './components/MovieDetails';
import Header from './components/Header';
import Footer from './components/Footer';

import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
    // {
    //     path: '/',
    //     element: (
    //         <>
    //             <App />
    //         </>
    //     ),
    // },
    {
        path: '/',
        element: (
            <>
                <Header /> <Dropdown /> <Footer />
            </>
        ),
    },
    {
        path: '/:id',
        element: (
            <>
                <Header /> <MovieDetails /> <Footer />
            </>
        ),
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
