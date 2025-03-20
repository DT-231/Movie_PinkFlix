import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import icon menu
import imgs from "@/assets/IMGS";
import { getGenre, getCountry } from "@/Service/FilmService";
import { useEffect } from "react";
import DropDownItem from "../../../Common/DropdownItem/DropdownItem";
import Search from "../Search/Search";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Header() {
    const [genreList, setGenreList] = useState({});
    const [CountryList, setCountryList] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Trạng thái mở menu

    useEffect(() => {
        const fetchGenre = async () => {
            let res = await getGenre();
            if (res) setGenreList(res);
        };

        const fetchCountry = async () => {
            let res = await getCountry();
            if (res) setCountryList(res);
        };

        fetchGenre();
        fetchCountry();
    }, []);

    return (
        <header className="flex 2xl:justify-around justify-between items-center px-5 sm:px-10 py-3 sm:py-5 bg-primary text-white relative">
            {/* Logo */}
            <Link to="/" className="w-24 sm:w-3xs cursor-pointer">
                <img src={imgs.logo} alt="princess Quyên" />
            </Link>

            {/* Icon menu trên mobile */}
            <button className="block xl:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </button>

            {/* Menu trên màn hình lớn */}
            <nav className="hidden xl:flex w-auto text-nowrap gap-6 text-2xl items-center">
                <DropDownItem ItemList={genreList} title={"Thể Loại"} type={"the-loai"} />
                <DropDownItem ItemList={CountryList} title={"Quốc gia"} row={6} type={"quoc-gia"} />
                <span className="cursor-pointer">Phim lẻ</span>
                <span className="cursor-pointer">Phim bộ</span>
                <Search />
            </nav>

            {/* Menu trên mobile (Hiện khi mở) */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-primary text-white flex flex-col items-center gap-4 p-5 text-center z-50 xl:hidden">
                    <DropDownItem ItemList={genreList} title={"Thể Loại"} type={"the-loai"} />
                    <DropDownItem ItemList={CountryList} title={"Quốc gia"} row={6} type={"quoc-gia"} />
                    <Link to={"/"}className="cursor-pointer">Phim lẻ</Link>
                    <Link to={"/"}className="cursor-pointer">Phim bộ</Link>
                    <Link to={"/"}className="cursor-pointer">Phim Hoạt Hình</Link>
                    <Search />
                </div>
            )}
        </header>
    );
}

export default Header;
