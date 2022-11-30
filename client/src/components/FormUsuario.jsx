import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FormUsuario = () => {
    return (
        <div className="p-4 border rounded bg-light w-form">
            <h2 className='text-purple text-center mb-4'>Novo usuário</h2>
            <Form className="mt-3">
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Nome" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Senha" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Confirmar senha"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Select>
                        <option>Nível de acesso</option>
                        <option value="1">Operador</option>
                        <option value="2">Gerente</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit" className="btn-purple">
                    Cadastrar
                </Button>
            </Form>
        </div>
    );
};

export default FormUsuario;
