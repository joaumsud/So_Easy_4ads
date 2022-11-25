import React from "react";
import axios from "axios";

import SearchBar from "./SearchBar";
import Lightbox from "./Lightbox";
import AlunoTable from "./AlunoTable";

const SearchAluno = () => {
    const [search, setSearch] = React.useState("");
    const [results, setResults] = React.useState([]);
    const [showResults, setShowResults] = React.useState(false);

    const handleSearch = async (e) => {
        const res = await axios.get("data/alunos.json");
        setResults(res.data.alunos);
        setSearch("");
        setShowResults(true);
    };

    return (
        <>
            <SearchBar
                searchTerm={search}
                onTyping={(e) => setSearch(e.target.value)}
                onSearch={handleSearch}
            />

            <Lightbox
                title="Resultados"
                show={showResults}
                onHide={() => setShowResults(false)}
            >
                <AlunoTable alunos={results} />
            </Lightbox>
        </>
    );
};

export default SearchAluno;
