import { Link } from "react-router-dom";

function SearchItem({ item }) {
    return (
        <Link className="flex gap-3 w-full  h-[100px]" to={`/phim/${item.slug}`}>
            {/* Hình ảnh */}
            <div className="w-[80px] h-auto overflow-hidden ">
                <img
                    src={`https://phimimg.com/${item.poster_url}`}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/50")}
                />
            </div>

            {/* Thông tin phim */}
            <div className="text-black font-Roboto flex flex-col text-left text-nowrap gap-1">
                <h5 className="text-[14px] font-bold truncate max-w-80 " title={item.name}>
                    {item.name}
                </h5>

                <p className="text-[10px] text-gray-500">{item.episode_current}</p>
            </div>
        </Link>
    );
}

export default SearchItem;
