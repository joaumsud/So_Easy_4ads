import React from "react";

import SearchAluno from "../components/SearchAluno/SearchAluno";
import FormOcorrencia from "../components/Forms/FormOcorrencia";
import FormDeclaracao from "../components/Forms/FormDeclaracao";
import FormNovoAluno from "../components/Forms/FormNovoAluno";
import Lightbox from "../components/Helpers/Lightbox";

const Gerente = () => {
    const [showFormAluno, setShowFormAluno] = React.useState(false);

    return (
        <>
            <SearchAluno />
            <div className='d-flex flex-wrap gap-4 align-items-center justify-content-center mt-5'>
                <div className="d-flex gap-4 flex-wrap align-items-center justify-content-center">
                    <FormOcorrencia />
                    <FormDeclaracao />
                </div>
                <button
                    className="m-auto text-center text-purple btn btn-link btn-aluno"
                    onClick={() => setShowFormAluno(true)}
                >
                    <i className="bi-plus-circle fs-1"></i>
                    <p className="text-center fw-bold">Novo aluno</p>
                </button>
            </div>

            <Lightbox
                title="Cadastrar aluno"
                show={showFormAluno}
                onHide={() => setShowFormAluno(false)}
            >
                <FormNovoAluno />
            </Lightbox>
        </>
    );
};

export default Gerente;
