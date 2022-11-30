import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const initialData = {
    aluno_id: "",
    resumo: "",
    data: "",
    arquivo: "",
};

const FormOcorrencia = () => {
    const [formData, setFormData] = React.useState(initialData);

    const onTyping = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData(initialData);
    };

    return (
        <div className="p-4 border rounded bg-light w-form">
            <div className="text-center">
                <i className="bi-file-earmark-text-fill fs-1 text-purple"></i>
            </div>
            <Form className="mt-3" onSubmit={handleSubmit}>
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
                        onChange={onTyping}
                        name="resumo"
                        value={formData.resumo}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="date"
                        onChange={onTyping}
                        name="data"
                        value={formData.data}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="file"
                        onChange={onTyping}
                        name="arquivo"
                        value={formData.arquivo}
                    />
                </Form.Group>
                <Button type="submit" className="btn-purple">
                    Salvar
                </Button>
            </Form>
        </div>
    );
};

export default FormOcorrencia;
