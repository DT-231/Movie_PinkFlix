import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import useDebounce from "@/Hooks/useDebounce";
import { searchFilm } from "@/Service/FilmService";
import SearchItem from "./SearchItem";

function Search() {
    const [valueSearch, setValueSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false); // Điều khiển hiển thị dropdown
    const debouncedValue = useDebounce(valueSearch, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            try {
                const result = await searchFilm(debouncedValue);
                setSearchResult(result.data.items);
            } catch (error) {
                console.error("Lỗi tìm kiếm:", error);
            }
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(" ")) {
            setValueSearch(searchValue);
        }
    };

    return (
        <div className="relative w-full max-w-lg">
            <Tippy
                placement="bottom"
                interactive={true}
                visible={showResult && searchResult.length > 0}
                delay={[200, 600]}
                maxWidth={400}
                onClickOutside={() => setShowResult(false)} // Ẩn khi click bên ngoài
                render={(attrs) => (
                    <div
                        className="bg-white shadow-lg max-w-80 lg:max-w-lg overflow-y-auto max-h-96 rounded-lg p-2"
                        tabIndex="-1"
                        {...attrs}
                    >
                        {searchResult.length > 0 &&
                            searchResult.map((item, i) => (
                                <div key={i} className="py-2">
                                    <SearchItem item={item} />
                                </div>
                            ))}
                    </div>
                )}
            >
                <div className="relative">
                    <input
                        className="bg-bgSearch rounded-2xl text-subtitle pl-5 pr-10 py-2 text-[18px] focus:outline-none w-full max-w-xs sm:max-w-lg"
                        placeholder="Tìm kiếm..."
                        value={valueSearch}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                        onBlur={() => setTimeout(() => setShowResult(false), 200)}
                    />

                    <div className="absolute top-1/2 right-2  text-2xl transform -translate-y-1/2 text-gray-400">
                        {loading ? <span className="animate-spin ">⏳</span> : <FontAwesomeIcon icon={faSearch} />}
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
