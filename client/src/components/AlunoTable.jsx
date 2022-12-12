import { useNavigate } from "react-router-dom";

import Table from "react-bootstrap/Table";

const AlunoTable = ({ alunos }) => {
    const navigate = useNavigate();

    return alunos.length > 0 ? (
        <Table striped bordered hover className="text-center">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>RA</th>
                    <th>Turma</th>
                    <th>
                        <i className="bi-file-earmark-text-fill text-purple"></i>
                    </th>
                </tr>
            </thead>
            <tbody>
                {alunos.map((aluno, i) => (
                    <tr
                        key={i}
                        onClick={() =>
                            navigate("aluno/", { state: { ...aluno } })
                        }
                        className='pointer'
                    >
                        <td>{aluno.alu_nome}</td>
                        <td>{aluno.alu_ra}</td>
                        <td>{aluno.alu_turma}</td>
                        <td>{aluno.alu_ocorrencias}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    ) : (
        <p className="text-danger text-center">
            Não foram encontrados resultados
        </p>
    );
};

export default AlunoTable;
