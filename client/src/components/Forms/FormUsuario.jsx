import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const initialData = {
    nome: "",
    email: "",
    senha: "",
    confirmar_senha: "",
    nivel_acesso: "",
};

const FormUsuario = () => {
    const [formData, setFormData] = React.useState(initialData);

    const onTyping = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={onTyping}
                        value={formData.email}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Senha"
                        name="senha"
                        onChange={onTyping}
                        value={formData.senha}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Confirmar senha"
                        name="confirmar_senha"
                        onChange={onTyping}
                        value={formData.confirmar_senha}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Select
                        onChange={onTyping}
                        name="nivel_acesso"
                        value={formData.nivel_acesso}
                    >
                        <option>Nível de acesso</option>
                        <option value="1">Operador</option>
                        <option value="2">Gerente</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit" className="btn-purple">
                    Cadastrar
                </Button>
            </Form>
        </div>
    );
};

export default FormUsuario;
