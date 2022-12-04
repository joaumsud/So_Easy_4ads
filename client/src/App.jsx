import React from "react";

import Header from "./components/Header";

import Admin from "./pages/Admin";
import Gerente from "./pages/Gerente";
import Login from "./pages/Login";
import Operador from "./pages/Operador";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/style.css";
import { useUser } from "./context/UserProvider";

const getUserPage = (value) => {
    switch (value) {
        case "1":
            return <Operador />;
        case "2":
            return <Gerente />;
        case "3":
            return <Admin />;
    }
};

const App = () => {
    const { value } = useUser();

    return (
        <>
            {!value ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Login />
                </div>
            ) : (
                <>
                    <Header />
                    <div className="p-4 p-sm-5">
                        {getUserPage(value.nivel_acesso)}
                    </div>
                </>
            )}
        </>
    );
};

export default App;
