import FilmItem from "../FilmItem/FilmItem";

const FilmSection = ({ title, films, line = true }) => {
    return (
        <div className={`max-w-[1500px] mt-10 pt-5 ${line ? "border-t-2  border-hotPink" : ""} 2xl:mx-auto mx-10`}>
            <h4 className="font-Roboto text-3xl font-bold text-white mb-4">{title}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-10">
                {films.length > 0 && films.map((item, i) => <FilmItem key={i} item={item} />)}
            </div>
        </div>
    );
};

export default FilmSection;
