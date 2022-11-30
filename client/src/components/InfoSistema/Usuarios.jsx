import React from "react";

import Info from "../Helpers/Info";
import Lightbox from "../Helpers/Lightbox";
import TabelaUsuarios from "./TabelaUsuarios";
import FormEditarUsuario from "../Forms/FormEditarUsuario";

const Usuarios = () => {
    const [showResults, setShowResults] = React.useState(false);
    const [editing, setEditing] = React.useState(false);
    const [usuario, setUsuario] = React.useState(null);

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
                onHide={() => {
                    setShowResults(false);
                    setEditing(false);
                }}
            >
                {editing ? (
                    <>
                        <i
                            className="bi-arrow-left pointer fs-5"
                            onClick={() => setEditing(false)}
                        ></i>
                        <FormEditarUsuario
                            handleClose={() => {
                                setEditing(false);
                                setUsuario(null);
                            }}
                            usuario={usuario}
                        />
                    </>
                ) : (
                    <TabelaUsuarios
                        usuarios={[
                            {
                                nome: "Fulano 1",
                                email: "fulano@email.com",
                                nivel_acesso: "1",
                            },
                            {
                                nome: "Fulano 2",
                                email: "fulano@email.com",
                                nivel_acesso: "2",
                            },
                            {
                                nome: "Fulano 3",
                                email: "fulano@email.com",
                                nivel_acesso: "2",
                            },
                        ]}
                        onEdit={(usuario) => {
                            setUsuario(usuario);
                            setEditing(true);
                            console.log(usuario);
                        }}
                        onRemove={(usuario) => {
                            setUsuario(usuario);
                            console.log(usuario);
                        }}
                    />
                )}
            </Lightbox>
        </>
    );
};

export default Usuarios;
