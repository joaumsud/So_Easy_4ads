import React from "react";

import Info from "./Info";
import Lightbox from "./Lightbox";

const Usuarios = () => {
    const [showResults, setShowResults] = React.useState(false);

    return (
        <>
            <Info
                infoName={"Usuários do sistema"}
                info={"10"}
                onDetail={() => setShowResults(true)}
            />

            <Lightbox
                title="Usuários"
                show={showResults}
                onHide={() => setShowResults(false)}
            >
                <p>Aqui</p>
            </Lightbox>
        </>
    );
};

export default Usuarios;
