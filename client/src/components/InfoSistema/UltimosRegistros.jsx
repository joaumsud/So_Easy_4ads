import React from "react";

import Info from "../Helpers/Info";
import Lightbox from "../Lightbox";
import TabelaRegistros from "../TabelaRegistros";

const UltimosRegistros = () => {
    const [showResults, setShowResults] = React.useState(false);

    return (
        <>
            <Info
                infoName={"Registros de hoje"}
                info={"10"}
                onDetail={() => setShowResults(true)}
            />

            <Lightbox
                title="Registros de hoje"
                show={showResults}
                onHide={() => setShowResults(false)}
            >
                <TabelaRegistros
                    registros={[
                        {
                            tipo: "ocorrencia",
                            data: "30-11-2022",
                            aluno: "Fulano - 1° A",
                            resumo: "Resumo...",
                            arquivo: "#",
                        },
                        {
                            tipo: "ocorrencia",
                            data: "30-11-2022",
                            aluno: "Fulano - 1° A",
                            resumo: "Resumo...",
                            arquivo: "#",
                        },
                        {
                            tipo: "declaracao",
                            data: "30-11-2022",
                            aluno: "Fulano - 1° A",
                            resumo: "Resumo...",
                            arquivo: "#",
                        },
                        {
                            tipo: "declaracao",
                            data: "30-11-2022",
                            aluno: "Fulano - 1° A",
                            resumo: "Resumo...",
                            arquivo: "#",
                        },
                    ]}
                />
            </Lightbox>
        </>
    );
};

export default UltimosRegistros;
