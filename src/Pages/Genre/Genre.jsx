// import { useState } from "react";
import { useParams } from "react-router-dom";

function Genre() {
    let { slugGenre } = useParams();
    // const [search,setSearch] = useState()




    return <> {slugGenre}</>;
}

export default Genre;
