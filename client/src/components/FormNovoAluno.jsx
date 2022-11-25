import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import FormAluno from "./FormAluno";
import FormResposavel from "./FormResponsavel";
import FormEndereco from "./FormEndereco";

const initialData = {
    aluno: {
        nome: "",
        ra: "",
        cpf: "",
        turma: "",
    },
    responsavel: {
        nome: "",
        cpf: "",
        telefone: "",
    },
    endereco: {
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: "",
        cep: "",
        comprovante: "",
    },
};

const FormNovoAluno = () => {
    const [formData, setFormData] = React.useState(initialData);

    const handleTyping = (e) => {
        console.log(e.target.parentElement.parentElement.id);
        setFormData((prevState) => ({
            ...prevState,
            [e.target.parentElement.parentElement.id]: {
                ...prevState[e.target.parentElement.parentElement.id],
                [e.target.name]: e.target.value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData(initialData);
    };

    return (
        <Form
            className="text-purple"
            onSubmit={handleSubmit}
            encTcype="multipart/form-data"
        >
            <div className="mb-5">
                <h5 className="mb-4">Dados do aluno</h5>
                <FormAluno aluno={formData.aluno} onTyping={handleTyping} />
            </div>
            <div className="mb-5">
                <h5 className="mb-4">Dados do responsavél</h5>
                <FormResposavel
                    responsavel={formData.responsavel}
                    onTyping={handleTyping}
                />
            </div>
            <div className="mb-4">
                <h5 className="mb-4">Endereço</h5>
                <FormEndereco
                    endereco={formData.endereco}
                    onTyping={handleTyping}
                />
            </div>
            <Button type="submit" className="btn-purple">
                Cadastrar
            </Button>
        </Form>
    );
};

export default FormNovoAluno;
