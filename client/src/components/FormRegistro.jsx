import React from "react";
import AsyncSelect from "react-select/async";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import CustomForm from "./CustomForm";
import gestaoAlunosAPI from "../api/gestaoAlunosAPI";

const initialValues = {
    aluno_id: "",
    resumo: "",
    data: "",
};

const FormRegistro = ({ action }) => {
    const [formData, setFormData] = React.useState(initialValues);
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const searchAluno = async (searchTerm) => {
        if (searchTerm) {
            try {
                const res = await gestaoAlunosAPI.buscarAlunos(searchTerm);
                return res.data.response.alunos.map((aluno) => {
                    return {
                        value: aluno.alu_id,
                        label: `${aluno.alu_nome} ${aluno.alu_turma}`,
                    };
                });
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]:
                e.target.name !== "file" ? e.target.value : e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fData = new FormData();
        fData.append("resumo", formData.resumo);
        fData.append("data", formData.data);
        fData.append("aluno_id", formData.aluno_id);
        fData.append("file", e.target.file.files[0]);

        try {
            const res = await gestaoAlunosAPI.cadastrarOcorrencia(fData);
            setSuccess(true);
        } catch (e) {
            console.log(e);
            setError(true);
        }

        e.target.reset();
        setFormData(initialValues);
    };

    return (
        <div className="p-4 border rounded bg-light w-form">
            <div className="text-center mb-3">
                {action === "ocorrencia" ? (
                    <i className="bi-file-earmark-text-fill fs-1 text-purple"></i>
                ) : (
                    <i className="bi-heart-pulse-fill fs-1 text-purple"></i>
                )}
            </div>
            <CustomForm
                error={error}
                success={success}
                error_message={"Não foi possível realizar o cadastro"}
                success_message={"Registro salvo com sucesso"}
                onCloseErrorAlert={() => setError(false)}
                onCloseSuccessAlert={() => setSuccess(false)}
                onSubmit={handleSubmit}
                className="mt-3"
            >
                <Form.Group className="mb-3">
                    <AsyncSelect
                        cacheOptions
                        loadOptions={searchAluno}
                        onInputChange={(data) => searchAluno(data)}
                        onChange={(data) =>
                            setFormData((prevState) => ({
                                ...prevState,
                                aluno_id: data.value,
                            }))
                        }
                        noOptionsMessage={() => "Sem resultados"}
                        placeholder="Selecionar aluno"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Resumo..."
                        name="resumo"
                        value={formData.resumo}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="date"
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="file" name="file" />
                </Form.Group>
                <Button type="submit" className="btn-purple mb-3">
                    Salvar
                </Button>
            </CustomForm>
        </div>
    );
};

export default FormRegistro;
