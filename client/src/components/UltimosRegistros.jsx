import React from "react";

import Info from "./Info";
import Lightbox from "./Lightbox";

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
                <p>Aqui</p>
            </Lightbox>
        </>
    );
};

export default UltimosRegistros;
