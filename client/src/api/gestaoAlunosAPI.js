import axios from "axios";

class GestaoAlunosAPI {
    constructor(user) {
        this.axios = axios.create({
            baseURL: "http://localhost:3000",
            headers: {
                authorization: `Bearer ${user ? user.token : ""}`,
            },
        });
    }

    login(data) {
        return this.axios.post("/usuarios/login/", data);
    }

    buscarAlunos(search) {
        return this.axios.get("/alunos/?search=" + search);
    }

    cadastrarOcorrencia(data) {
        return this.axios.post("/ocorrencias/", data);
    }

    atualizarOcorrencia(data, oco_id) {
        return this.axios.put("/ocorrencias/" + oco_id, data);
    }

    buscarOcorrencias(alu_id) {
        return this.axios.get("/ocorrencias/" + alu_id);
    }

    excluirOcorrencia(oco_id) {
        return this.axios.delete("/ocorrencias/" + oco_id);
    }

    novoUsuario(data) {
        return this.axios.post("/usuarios/cadastro/", data);
    }
}

export default GestaoAlunosAPI;
