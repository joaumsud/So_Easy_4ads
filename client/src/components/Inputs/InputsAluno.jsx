import Form from "react-bootstrap/Form";

const InputsAluno = ({ aluno, onTyping }) => {
    return (
        <div id='aluno'>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Nome"
                    name="nome"
                    value={aluno.nome}
                    onChange={onTyping}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="RA"
                    name="ra"
                    value={aluno.ra}
                    onChange={onTyping}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="CPF"
                    name="cpf"
                    value={aluno.cpf}
                    onChange={onTyping}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Turma"
                    name="turma"
                    value={aluno.turma}
                    onChange={onTyping}
                />
            </Form.Group>
        </div>
    );
};

export default InputsAluno;
