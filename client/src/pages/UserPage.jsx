import { useUser } from "../context/UserProvider";
import Header from "../components/Header";
import SearchAlunos from "../components/SearchAlunos";
import Gerente from "./Gerente";
import Admin from "./Admin";
import Login from "./Login";

const GERENTE = "2";
const ADMIN = "3";

const getPage = (nivel_acesso) => {
    switch (nivel_acesso) {
        case GERENTE:
            return <Gerente />;
        case ADMIN:
            return <Admin />;
    }
};

const UserPage = () => {
    const { user } = useUser();

    return (
        <>
            {user ? (
                <>
                    <Header></Header>
                    <main className="p-4 p-sm-5">
                        <SearchAlunos />
                        {getPage(user.nivel_acesso)}
                    </main>
                </>
            ) : (
                <Login />
            )}
        </>
    );
};

export default UserPage;
