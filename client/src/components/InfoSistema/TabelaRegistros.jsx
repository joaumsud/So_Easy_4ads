import Table from "react-bootstrap/Table";

const TabelaRegistros = ({ registros }) => {
    return (
        <Table striped bordered hover className="text-center">
            <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Aluno</th>
                    <th>Resumo</th>
                    <th>Arquivo</th>
                </tr>
            </thead>
            <tbody>
                {registros.map((registro, i) => (
                    <tr key={i}>
                        <td>
                            {registro.tipo === "ocorrencia" ? (
                                <i className="bi-file-earmark-text-fill text-purple"></i>
                            ) : (
                                <i className="bi-heart-pulse-fill text-purple"></i>
                            )}
                        </td>
                        <td>{registro.data}</td>
                        <td>{registro.aluno}</td>
                        <td>{registro.resumo}</td>
                        <td>
                            <a href={registro.arquivo}>
                                <i className="bi-arrow-down-circle-fill text-purple"></i>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TabelaRegistros;
