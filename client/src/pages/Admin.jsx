import FormUsuario from "../components/FormUsuario";
import UltimosRegistros from "../components/InfoSistema/UltimosRegistros";
import Usuarios from "../components/InfoSistema/Usuarios";

const Admin = () => {
    return (
        <>
            <div className="mt-5 d-flex justify-content-center flex-wrap gap-4 mx-auto">
                <div>
                    <FormUsuario />
                </div>
                {/* <div className="border p-4 rounded bg-light">
                    <h2 className="text-purple mb-4">Informações do sistema</h2>
                    <UltimosRegistros />
                    <Usuarios />
                </div> */}
            </div>
        </>
    );
};

export default Admin;
