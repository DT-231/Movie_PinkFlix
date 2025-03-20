import { useEffect, useState } from "react";
import FilmItem from "../../Components/FilmItem/FilmItem";
import FilmSection from "../../Components/FilmSection/FilmSection"; // Import component mới
import { getFilmNewUpdate, getAnime, getSingleMovie, getSeriesMovie } from "../../Service/FilmService";

function Home() {
    const [filmList, setFilmList] = useState([]);
    const [animeList, setAnimeList] = useState([]);
    const [singleMovie, setSingleMovie] = useState([]);
    const [seriesMovie, setSeriesMovie] = useState([]);

    useEffect(() => {
        const fetchFilm = async () => {
            let result = await getFilmNewUpdate();
            if (result.status) {
                setFilmList(result.items);
            }
        };
        const fetchAnime = async () => {
            let result = await getAnime();
            if (result.status) {
                setAnimeList(result.data.items);
            }
        };
        const fetchSingleMovie = async () => {
            let result = await getSingleMovie();
            if (result.status) {
                setSingleMovie(result.data.items);
            }
        };
        const fetchSeriesMovie = async () => {
            let result = await getSeriesMovie();
            if (result.status) {
                setSeriesMovie(result.data.items);
            }
        };
        fetchSingleMovie();
        fetchSeriesMovie();
        fetchAnime();
        fetchFilm();
    }, []);

    return (
        <div className="bg-secondary w-full h-auto py-10">
            <FilmSection title="Phim mới cập nhật" films={filmList} line={false} />

            {/* Phim Hoạt hình */}
            <FilmSection title="Phim Hoạt Hình" films={animeList} />

            {/* Phim Lẻ */}
            <FilmSection title="Phim Lẻ" films={singleMovie} />

            {/* Phim Bộ */}
            <FilmSection title="Phim Bộ" films={seriesMovie} />
        </div>
    );
}

export default Home;
