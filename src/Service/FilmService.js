import request from "../Setup/axios";

const getGenre = () => {
    return request.get("the-loai");
};

const getGenreDetail = (genre) => {
    return request.get(`v1/api/the-loai/${genre}`);
};

const getCountry = () => {
    return request.get("quoc-gia");
};

const searchFilm = (value) => {
    return request.get(`v1/api/tim-kiem?keyword=${value}&limit=10`);
};

const getFilmDetail = (value) => {
    return request.get(`phim/${value}`);
};

const getFilmNewUpdate = (page = 1, limit = 12) => {
    return request.get(`danh-sach/phim-moi-cap-nhat-v2?page=${page}&limit=${limit}`);
};

const getAnime = (page = 1, limit = 12) => {
    return request.get(`v1/api/danh-sach/hoat-hinh?page=${page}&limit=${limit}`);
};

const getSingleMovie = (page = 1, limit = 12) => {
    return request.get(`v1/api/danh-sach/phim-le?page=${page}&limit=${limit}`);
};

const getSeriesMovie = (page = 1, limit = 12) => {
    return request.get(`v1/api/danh-sach/phim-bo?page=${page}&limit=${limit}`);
};

export {
    getGenre,
    getGenreDetail,
    getCountry,
    searchFilm,
    getFilmDetail,
    getFilmNewUpdate,
    getAnime,
    getSingleMovie,
    getSeriesMovie,
};
