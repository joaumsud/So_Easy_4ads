import Form from "react-bootstrap/Form";

const InputsResponsavel = ({ responsavel, onTyping }) => {
    return (
        <div id="responsavel">
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Nome"
                    name="nome"
                    value={responsavel.nome}
                    onChange={onTyping}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="CPF"
                    name="cpf"
                    value={responsavel.cpf}
                    onChange={onTyping}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Telefone"
                    name="telefone"
                    value={responsavel.telefone}
                    onChange={onTyping}
                />
            </Form.Group>
        </div>
    );
};

export default InputsResponsavel;
