import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import InputsAluno from "./Inputs/InputsAluno";
import InputsEndereco from "./Inputs/InputsEndereco";
import InputsResponsavel from "./Inputs/InputsResponsavel";

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
            encType="multipart/form-data"
        >
            <div className="mb-5">
                <h5 className="mb-4">Dados do aluno</h5>
                <InputsAluno aluno={formData.aluno} onTyping={handleTyping} />
            </div>
            <div className="mb-5">
                <h5 className="mb-4">Dados do responsável</h5>
                <InputsResponsavel
                    responsavel={formData.responsavel}
                    onTyping={handleTyping}
                />
            </div>
            <div className="mb-4">
                <h5 className="mb-4">Endereço</h5>
                <InputsEndereco
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
