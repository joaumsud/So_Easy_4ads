import SearchAluno from "../components/SearchAluno";
import FormUsuario from "../components/FormUsuario";
import UltimosRegistros from "../components/UltimosRegistros";
import Usuarios from "../components/Usuarios";

const Admin = () => {
    return (
        <>
            <SearchAluno />
            <div className="mt-5 d-flex justify-content-center flex-wrap gap-4 mx-auto">
                <div>
                    <FormUsuario />
                </div>
                <div>
                    <h2 className="text-purple mb-4">Informações do sistema</h2>
                    <UltimosRegistros />
                    <Usuarios />
                </div>
            </div>
        </>
    );
};

export default Admin;
