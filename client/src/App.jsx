import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Admin from "./pages/Admin";
import Aluno from "./pages/Aluno";
import Gerente from "./pages/Gerente";
import Login from "./pages/Login";
import Operador from "./pages/Operador";

import Header from "./components/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/style.css";

const App = () => {
    return (
        <>
            <ul className="d-flex gap-2">
                <span>Links para teste:</span>
                <Link to={"/admin"}>Admin</Link>
                <Link to={"/aluno"}>aluno</Link>
                <Link to={"/gerente"}>gerente</Link>
                <Link to={"/login"}>login</Link>
                <Link to={"/operador"}>operador</Link>
            </ul>

            <Header />

            <main className="p-4 p-sm-5">
                <Routes>
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/aluno" element={<Aluno />} />
                    <Route path="/gerente" element={<Gerente />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/operador" element={<Operador />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
