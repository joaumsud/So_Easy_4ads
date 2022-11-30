import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FormEditarUsuario = ({ usuario, handleClose }) => {
    const [nivel_acesso, setNivelAcesso] = React.useState(usuario.nivel_acesso);

    return (
        <div className="p-4 border rounded bg-light w-form">
            <h2 className="text-purple text-center mb-4">Editar usuário</h2>
            <Form
                className="mt-3"
                onSubmit={() => {
                    console.log(nivel_acesso);
                    handleClose();
                }}
            >
                <Form.Group className="mb-3">
                    <Form.Select
                        onChange={(e) => setNivelAcesso(e.target.value)}
                        name="nivel_acesso"
                        value={nivel_acesso}
                    >
                        <option>Nível de acesso</option>
                        <option value="1">Operador</option>
                        <option value="2">Gerente</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit" className="btn-purple">
                    Salvar
                </Button>
            </Form>
        </div>
    );
};

export default FormEditarUsuario;
