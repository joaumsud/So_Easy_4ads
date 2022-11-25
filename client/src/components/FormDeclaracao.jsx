import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FormDeclaracao = () => {
    return (
        <div className="p-4 border rounded bg-light form-registros">
            <div className="text-center">
                <i className="bi-heart-pulse-fill fs-1 text-purple"></i>
            </div>
            <Form className="mt-3">
                <Form.Group className="mb-3">
                    <Form.Select>
                        <option>Selecionar aluno</option>
                        <option value="1">Bruno</option>
                        <option value="2">Camila</option>
                        <option value="3">Claudemir</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Resumo..."
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="date" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="file" />
                </Form.Group>
                <Button type="submit" className="btn-purple">
                    Salvar
                </Button>
            </Form>
        </div>
    );
};

export default FormDeclaracao;
