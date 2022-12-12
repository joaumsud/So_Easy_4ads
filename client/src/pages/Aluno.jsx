import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Header from "../components/Header";
import TabelaRegistros from "../components/TabelaRegistros";
import Lightbox from "../components/Lightbox";

import gestaoAlunosAPI from "../api/gestaoAlunosAPI";

const Aluno = () => {
    const { state } = useLocation();

    const [registros, setRegistros] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [remove, setRemove] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [ocorrencia, setOcorrencia] = React.useState({});
    const [status, setStatus] = React.useState({ show: false });

    React.useEffect(() => {
        const getOcorrencias = async () => {
            setLoading(true);
            try {
                const res = await gestaoAlunosAPI.buscarOcorrencias(
                    state.alu_id
                );

                setRegistros(res.data.response.ocorrencias);
                setError(false);
            } catch (e) {
                console.log(e);
                setError(true);
            }
            setLoading(false);
        };

        getOcorrencias();
    }, []);

    const handleChange = (e) => {
        setOcorrencia((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleDelete = async () => {
        try {
            const res = await gestaoAlunosAPI.excluirOcorrencia(ocorrencia.id);
            setRegistros(
                registros.filter((registro) => registro.oco_id != ocorrencia.id)
            );
            setStatus((prevState) => ({
                ...prevState,
                show: true,
                message: "Ocorrência excluída com sucesso",
                style: "success",
            }));
        } catch (e) {
            console.log(e);
            setStatus((prevState) => ({
                ...status,
                show: true,
                message: "Não foi possível excluir a ocorrência",
                style: "danger",
            }));
        }

        setRemove(false);
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        const fData = new FormData();
        fData.append("resumo", ocorrencia.resumo);
        fData.append("data", ocorrencia.data);
        e.target.file.files[0] && fData.append("file", e.target.file.files[0]);

        try {
            const res = await gestaoAlunosAPI.atualizarOcorrencia(
                fData,
                ocorrencia.id
            );

            console.log(res);

            const novosRegistros = registros.map((registro) => {
                if (registro.oco_id === ocorrencia.id) {
                    registro.oco_resumo = ocorrencia.resumo;
                    registro.oco_data = ocorrencia.data;
                    registro.oco_doc_path = res.data.updateOcorrencia.file
                        ? res.data.updateOcorrencia.file
                        : registro.oco_doc_path;
                }

                return registro;
            });

            setRegistros(novosRegistros);

            setStatus((prevState) => ({
                ...prevState,
                show: true,
                message: "Ocorrência atualizada com sucesso",
                style: "success",
            }));
        } catch (e) {
            console.log(e);
            setStatus((prevState) => ({
                ...status,
                show: true,
                message: "Não foi possível atualizar a ocorrência",
                style: "danger",
            }));
        }

        setEdit(false);
    };

    return (
        <>
            {state != null ? (
                <>
                    <Header />

                    <div className="p-5 mx-auto alu-container">
                        <h1 className="text-purple mb-3">{state.alu_nome}</h1>
                        <p className="mb-1">
                            <span className="text-purple fw-bold">Turma: </span>
                            {state.alu_turma}
                        </p>
                        <p>
                            <span className="text-purple fw-bold">RA: </span>
                            {state.alu_ra}
                        </p>

                        <h2 className="text-purple my-4">Ocorrências</h2>

                        {loading && (
                            <div className="d-flex justify-content-center">
                                <div
                                    className="spinner-border text-purple"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        )}

                        {registros.length > 0 && (
                            <TabelaRegistros
                                registros={registros}
                                handleEdit={(registro) => {
                                    setEdit(true);
                                    setOcorrencia((prevState) => ({
                                        ...prevState,
                                        id: registro.oco_id,
                                        resumo: registro.oco_resumo,
                                        data: registro.oco_data,
                                    }));
                                }}
                                handleDelete={(registro) => {
                                    setRemove(true);
                                    setOcorrencia((prevState) => ({
                                        ...prevState,
                                        id: registro.oco_id,
                                        resumo: registro.oco_resumo,
                                        data: registro.oco_data,
                                    }));
                                }}
                            />
                        )}

                        <Alert
                            show={status.show}
                            variant={status.style}
                            onClose={() =>
                                setStatus((prevState) => ({
                                    ...prevState,
                                    show: false,
                                }))
                            }
                            dismissible
                            className="my-4"
                        >
                            {status.message}
                        </Alert>

                        {error && (
                            <Alert variant="danger">
                                Não há registro de ocorrências
                            </Alert>
                        )}

                        <Lightbox
                            title="Tem certeza que deseja excluir esta ocorrência?"
                            show={remove}
                            onHide={() => setRemove(false)}
                        >
                            <button
                                className="btn btn-dark"
                                onClick={() => setRemove(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="btn btn-purple ms-2"
                                onClick={handleDelete}
                            >
                                Confirmar
                            </button>
                        </Lightbox>

                        <Lightbox
                            title="Editar ocorrência"
                            show={edit}
                            onHide={() => setEdit(false)}
                        >
                            <Form onSubmit={handleEdit}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="Resumo..."
                                        name="resumo"
                                        value={ocorrencia.resumo}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="date"
                                        name="data"
                                        value={ocorrencia.data}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="file" name="file" />
                                </Form.Group>
                                <Button
                                    type="submit"
                                    className="btn-purple mb-3"
                                >
                                    Salvar
                                </Button>
                            </Form>
                        </Lightbox>
                    </div>
                </>
            ) : (
                <Navigate to={"/"} />
            )}
        </>
    );
};

export default Aluno;
