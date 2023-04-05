import Dropdown from './components/Dropdown';
import Header from './components/Header';
import './css/index.css';
import MovieDetails from './components/MovieDetails';
import Footer from './components/Footer';
// import { createHashRouter, RouterProvider } from 'react-router-dom';

// const router = createHashRouter([
//     {
//         basename: '/moviehive',
//         path: '/',
//         element: <App />,
//     },
//     {
//         path: '/moviehive',
//         element: (
//             <>
//                 <Header /> <Dropdown /> <Footer />
//             </>
//         ),
//     },
//     {
//         path: '/:id',

//         element: (
//             <>
//                 <Header /> <MovieDetails /> <Footer />
//             </>
//         ),
//     },
// ]);
const home = () => {
    window.location = '/#/moviehive';
};
function App() {
    // console.log(process.env);
    return (
        <>
            <Header />
            <button onClick={home()}>HAHAHA</button>
            <Footer />
        </>
    );
}

export default App;
