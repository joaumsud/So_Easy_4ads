import Table from "react-bootstrap/Table";

const AlunoTable = ({ alunos }) => {
    return (
        <Table striped bordered hover className='text-center'>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>RA</th>
                    <th>Turma</th>
                    <th>
                        <i className="bi-file-earmark-text-fill text-purple"></i>
                    </th>
                    <th>
                        <i className="bi-heart-pulse-fill text-purple"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                {alunos.map((aluno, i) => (
                    <tr key={i}>
                        <td>{aluno.nome}</td>
                        <td>{aluno.ra}</td>
                        <td>{aluno.turma}</td>
                        <td>{aluno.ocorrencias}</td>
                        <td>{aluno.declaracoes}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AlunoTable;
