import Home from "../Pages/Home/Home";
import Genre from "../Pages/Genre/Genre";
import FilmDetail from "../Pages/FilmDetail/FilmDetail";
import Watch from "../Pages/Watch/Watch";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/home", component: Home },
    { path: "/the-loai/:slugGenre", component: Genre },
    { path: "/phim/:slugFilm", component: FilmDetail },
    { path: "/phim/:slugFilm/:episode/:server", component: Watch },
];

export { publicRoutes };
