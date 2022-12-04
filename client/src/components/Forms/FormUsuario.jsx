import React from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { useUser } from "../../context/UserProvider";

const initialData = {
    nome: "",
    email: "",
    senha: "",
    nivel_acesso: "",
};

const FormUsuario = () => {
    const { value } = useUser();
    const [formData, setFormData] = React.useState(initialData);
    const [error, setError] = React.useState(false);
    const [sucesso, setSucesso] = React.useState(false);

    const onTyping = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        formData.nivel_acesso = parseInt(formData.nivel_acesso);
        try {
            const res = await axios.post(
                "http://localhost:3000/usuarios/cadastro/",
                formData,
                {
                    headers: {
                        authorization: "Bearer " + value.token,
                    },
                }
            );

            setSucesso(true);
        } catch (e) {
            setError(true);
        }

        setFormData(initialData);
    };

    return (
        <div className="p-4 border rounded bg-light w-form">
            <h2 className="text-purple text-center mb-4">Novo usuário</h2>
            <Form className="mt-3" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Nome"
                        name="nome"
                        onChange={onTyping}
                        value={formData.nome}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={onTyping}
                        value={formData.email}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Senha"
                        name="senha"
                        onChange={onTyping}
                        value={formData.senha}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Select
                        onChange={onTyping}
                        name="nivel_acesso"
                        value={formData.nivel_acesso}
                        required
                    >
                        <option>Nível de acesso</option>
                        <option value="1">Operador</option>
                        <option value="2">Gerente</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit" className="btn-purple mb-3">
                    Cadastrar
                </Button>
                <Alert
                    show={sucesso}
                    variant="success"
                    onClose={() => setSucesso(false)}
                    dismissible
                >
                    Usuário cadastrado com sucesso
                </Alert>
                <Alert
                    show={error}
                    variant="danger"
                    onClose={() => setError(false)}
                    dismissible
                >
                    Não foi possível cadastrar o usuário...
                </Alert>
            </Form>
        </div>
    );
};

export default FormUsuario;
