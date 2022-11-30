import Form from "react-bootstrap/Form";

const InputsEndereco = ({ endereco, onTyping }) => {
    return (
        <div id="endereco">
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Estado"
                    name="estado"
                    value={endereco.estado}
                    onChange={onTyping}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Cidade"
                    name="cidade"
                    value={endereco.cidade}
                    onChange={onTyping}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Bairro"
                    name="bairro"
                    value={endereco.bairro}
                    onChange={onTyping}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Rua"
                    name="rua"
                    value={endereco.rua}
                    onChange={onTyping}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Número"
                    name="numero"
                    value={endereco.numero}
                    onChange={onTyping}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="CEP"
                    name="cep"
                    value={endereco.cep}
                    onChange={onTyping}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="file"
                    name="comprovante"
                    value={endereco.comprovante}
                    onChange={onTyping}
                />
            </Form.Group>
        </div>
    );
};

export default InputsEndereco;
