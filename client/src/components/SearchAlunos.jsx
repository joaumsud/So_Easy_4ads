import React from "react";
import Form from "react-bootstrap/Form";

import Lightbox from "./Lightbox";
import AlunoTable from "./AlunoTable";
import { useUser } from "../context/UserProvider";
import GestaoAlunosAPI from "../api/gestaoAlunosAPI";

const SearchAlunos = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [showResults, setShowResults] = React.useState(false);
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const { user } = useUser();
    const gestaoAlunosAPI = new GestaoAlunosAPI(user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setResults([]);
        setLoading(true);
        setShowResults(true);
        setSearchTerm("");

        try {
            const res = await gestaoAlunosAPI.buscarAlunos(searchTerm);
            setResults(res.data.response.alunos);
        } catch (e) {
            console.log(e);
        }

        setLoading(false);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="position-relative">
                    <i className="bi-search fs-4 position-absolute top-50 ms-4 translate-middle"></i>
                    <Form.Control
                        type="text"
                        placeholder="Buscar aluno por nome, RA ou turma"
                        className="p-3 ps-5 rounded-pill shadow-sm fs-5"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </Form>

            <Lightbox
                title="Resultados"
                show={showResults}
                onHide={() => {
                    setShowResults(false);
                }}
            >
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div
                            className="spinner-border text-purple"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <AlunoTable alunos={results} />
                )}
            </Lightbox>
        </>
    );
};

export default SearchAlunos;
