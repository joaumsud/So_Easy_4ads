import React from "react";

import FormRegistro from "../components/FormRegistro";

const Gerente = () => {
    const [showFormAluno, setShowFormAluno] = React.useState(false);

    return (
        <>
            <div className="d-flex flex-wrap gap-4 align-items-center justify-content-center mt-5">
                <div className="d-flex gap-4 flex-wrap align-items-center justify-content-center">
                    <FormRegistro action={"ocorrencia"} />
                </div>
            </div>
        </>
    );
};

export default Gerente;
