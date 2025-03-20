import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFilmDetail } from "../../Service/FilmService";
import { decodeHtmlEntities } from "../../Common/decodeHtmlEntities";
import { ExpandableText } from "../../Common/ExpandableText/ExpandableText";
import EpisodesSelection from "../../Common/EpisodesSelection/EpisodesSelection";

function FilmDetail() {
    let { slugFilm } = useParams();
    const [filmDetail, setFilmDetail] = useState({});
    const [resultFilm, setResultFilm] = useState({});
    const [selectedServer, setSelectedServer] = useState(0); // Default to first server

    useEffect(() => {
        const fetchFilm = async () => {
            let result = await getFilmDetail(slugFilm);
            console.log("resquest : ", result);

            if (result.status) {
                setFilmDetail(result.movie);
                setResultFilm(result);
            }
        };
        fetchFilm();
    }, [slugFilm]); // Add slugFilm as dependency

    const renderTag = (items) => {
        return items?.map((item, i) => (
            <span key={i}>
                {item.name} {items.length > 0 && i !== items.length - 1 && ","}
            </span>
        ));
    };

    // Function to extract audio type from server name
    const getAudioType = (serverName) => {
        if (serverName.includes("Vietsub")) return "vietsub";
        if (serverName.includes("Thuyết Minh")) return "TM";
        return "Unknown";
    };

    return (
        <div className="w-full h-auto bg-secondary py-10 px-4">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">
                <div className="w-full lg:w-lg flex justify-center">
                    <img src={filmDetail.poster_url} className="w-64 lg:w-full object-contain" alt={filmDetail.name} />
                </div>
                <div className="text-white font-Roboto flex flex-col gap-3 bg-primary w-full p-4 rounded-2xl">
                    <h3 className="text-3xl lg:text-5xl font-bold">{filmDetail.name}</h3>
                    <h5 className="text-xl lg:text-2xl text-hotPink">Tên khác: {filmDetail.origin_name}</h5>
                    <div className="text-base lg:text-xl flex flex-col gap-2">
                        <p>Đạo diễn: {filmDetail.director}</p>
                        <p>
                            Diễn viên:{" "}
                            {filmDetail.actor?.map((item, i) => (
                                <span key={i}>
                                    {item}
                                    {filmDetail.actor.length > 0 && i !== filmDetail.actor.length - 1 && ", "}
                                </span>
                            ))}
                        </p>

                        <p>Thể loại: {renderTag(filmDetail.category)}</p>
                        <p>Quốc gia: {renderTag(filmDetail.country)} </p>
                        <p>Thời lượng: {filmDetail.time}</p>
                        <p>Năm sản xuất: {filmDetail.year}</p>
                        <p>Chất lượng: {filmDetail.quality}</p>
                    </div>
                    <div className="flex flex-row py-5 gap-10">
                        {resultFilm?.episodes && resultFilm.episodes.length > 0 && (
                            <Link
                                to={`/phim/${slugFilm}/${
                                    resultFilm.episodes[selectedServer]?.server_data?.[0]?.slug
                                }/${getAudioType(resultFilm.episodes[selectedServer]?.server_name || "")}`}
                                className="text-2xl bg-hotPink font-Popin font-bold px-10 py-5 rounded-full"
                            >
                                Xem phim
                            </Link>
                        )}
                        {filmDetail.trailer_url && (
                            <a
                                href={`${filmDetail.trailer_url}`}
                                className="text-2xl bg-bgSearch font-Popin font-bold px-10 py-5 rounded-full"
                            >
                                Trailer
                            </a>
                        )}
                    </div>
                </div>
            </div>
            <div className="py-20">
                <div className="text-white">
                    <h5 className="text-3xl font-Roboto font-bold text-center mb-5">Nội dung phim</h5>
                    <ExpandableText text={decodeHtmlEntities(filmDetail.content)} />
                </div>

                {/* Audio Version Selection */}
                {resultFilm?.episodes && resultFilm.episodes.length > 1 && (
                    <div className="mt-10">
                        <h5 className="text-3xl font-Roboto font-bold text-center text-white mb-5">
                            Chọn phiên bản âm thanh
                        </h5>
                        <div className="flex justify-center gap-4 mb-10">
                            {resultFilm.episodes.map((server, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedServer(index)}
                                    className={`px-6 py-3 rounded-lg font-bold text-lg ${
                                        selectedServer === index ? "bg-hotPink text-white" : "bg-gray-700 text-gray-300"
                                    }`}
                                >
                                    {getAudioType(server.server_name)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Display episodes for selected server */}
                {resultFilm?.episodes && resultFilm.episodes.length > 0 && (
                    <div>
                        <EpisodesSelection episodes={resultFilm.episodes[selectedServer]} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default FilmDetail;
