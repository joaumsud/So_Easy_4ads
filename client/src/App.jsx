import React from "react";
import { Routes, Route } from "react-router-dom";

import UserPage from "./pages/UserPage";
import Aluno from "./pages/Aluno";
import { useUser } from "./context/UserProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/style.css";

const App = () => {
    const { user } = useUser();
    return (
        <>
            <Routes>
                <Route exact path="/" element={<UserPage />} />
                {user && <Route exact path="/aluno" element={<Aluno />} />}
                <Route
                    exact
                    path="*"
                    element={
                        <h1 className="text-purple p-5">
                            Página não encontrada (404)
                        </h1>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
