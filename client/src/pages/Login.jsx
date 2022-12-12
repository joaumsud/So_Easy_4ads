import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useUser } from "../context/UserProvider";
import CustomForm from "../components/CustomForm";
import gestaoAlunosAPI from "../api/gestaoAlunosAPI";

const initialValues = {
    email: "",
    senha: "",
};

const Login = () => {
    const [formData, setFormData] = React.useState(initialValues);
    const [error, setError] = React.useState(false);
    const { onChangeUser } = useUser();

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await gestaoAlunosAPI.login(formData);

            const user = {
                token: res.data.token,
                nivel_acesso: res.data.nivel_acesso,
            };

            onChangeUser(user);
        } catch (e) {
            setError(true);
        }

        setFormData(initialValues);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded p-5 bg-light w-form m-auto shadow">
                <h1 className="text-purple text-center mb-4 fw-bold">
                    Entre na sua conta
                </h1>
                <CustomForm
                    onSubmit={handleSubmit}
                    error={error}
                    error_message={"Email ou senha incorretos"}
                    onCloseErrorAlert={() => setError(false)}
                >
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="password"
                            name="senha"
                            placeholder="Senha"
                            value={formData.senha}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button type="submit" className="btn-purple mb-3">
                        Entrar
                    </Button>
                </CustomForm>
            </div>
        </div>
    );
};

export default Login;
