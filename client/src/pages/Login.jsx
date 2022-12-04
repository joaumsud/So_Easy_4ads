import React from "react";
import axios from "axios";

import { useUser } from "../context/UserProvider";

const initialValues = {
    email: "",
    senha: "",
};

const Login = () => {
    const [formData, setFormData] = React.useState(initialValues);
    const [error, setError] = React.useState("");
    const { onChange } = useUser();

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:3000/usuarios/login/",
                formData
            );

            setError("");

            const user = {
                token: res.data.token,
                nivel_acesso: res.data.nivel_acesso,
            };

            onChange(user);
        } catch (e) {
            setError("Email ou senha incorretos...");
        }
    };

    return (
        <>
            <div className="border rounded p-5 bg-light w-form m-auto shadow">
                <h1 className="text-purple text-center mb-5">Login</h1>

                <form onSubmit={handleSubmit} className="mb-3">
                    <input
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        placeholder="Email"
                        className="form-control mb-3"
                        required
                    />
                    <input
                        type="password"
                        value={formData.senha}
                        onChange={handleChange}
                        name="senha"
                        placeholder="Senha"
                        className="form-control mb-3"
                        required
                    />
                    <input
                        type="submit"
                        value="Entrar"
                        className="btn btn-purple text-light"
                    />
                </form>

                {error && <p className="alert alert-danger">{error}</p>}
            </div>
        </>
    );
};

export default Login;
