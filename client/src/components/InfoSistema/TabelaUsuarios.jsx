import Table from "react-bootstrap/Table";

const TabelaUsuarios = ({ usuarios, onRemove, onEdit }) => {
    return (
        <Table striped bordered hover className="text-center">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Nível de acesso</th>
                    <th>Editar</th>
                    <th>Remover</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario, i) => (
                    <tr key={i}>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>
                            {usuario.nivel_acesso === "1"
                                ? "Operador"
                                : "Gerente"}
                        </td>
                        <td>
                            <i
                                className="bi-pencil-square text-purple pointer"
                                onClick={(e) => onEdit(usuario)}
                            ></i>
                        </td>
                        <td>
                            <i
                                className="bi-trash3-fill text-purple pointer"
                                onClick={(e) => onRemove(usuario)}
                            ></i>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TabelaUsuarios;
