import Table from "react-bootstrap/Table";

import { useUser } from "../context/UserProvider";

const TabelaRegistros = ({ registros, handleDelete, handleEdit }) => {
    const { user } = useUser();
    return (
        <Table striped bordered hover className="text-center">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Resumo</th>
                    <th>Arquivo</th>
                    {user && user.nivel_acesso > 1 && (
                        <>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </>
                    )}
                </tr>
            </thead>
            <tbody>
                {registros.map((registro, i) => (
                    <tr key={registro.oco_id}>
                        <td>
                            {new Date(registro.oco_data).toLocaleDateString()}
                        </td>
                        <td>{registro.oco_resumo}</td>
                        <td>
                            {registro.oco_doc_path ? (
                                <a
                                    href={`http://localhost:3000/${registro.oco_doc_path}`}
                                    target="_blank"
                                >
                                    <i className="bi-arrow-down-circle-fill text-purple"></i>
                                </a>
                            ) : (
                                <i className="bi-arrow-down-circle-fill light-gray"></i>
                            )}
                        </td>
                        {user && user.nivel_acesso > 1 && (
                            <>
                                <th>
                                    <i
                                        className="bi-pencil-square text-purple pointer"
                                        onClick={() => handleEdit(registro)}
                                    ></i>
                                </th>
                                <th>
                                    <i
                                        className="bi-trash3-fill text-purple pointer"
                                        onClick={() => handleDelete(registro)}
                                    ></i>
                                </th>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TabelaRegistros;
