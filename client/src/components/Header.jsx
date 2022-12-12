import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useUser } from "../context/UserProvider";

const Header = () => {
    const { onChangeUser } = useUser();
    const navigate = useNavigate();

    return (
        <Navbar bg="light" variant="light" className="shadow-sm">
            <Container>
                <Nav className="m-auto">
                    <div className="nav-item">
                        <Link to={"/"} className="nav-link">
                            <i className="bi-book-half fs-2 text-purple"></i>
                        </Link>
                    </div>
                    <NavDropdown
                        title={
                            <i className="bi-person-circle fs-2 text-purple"></i>
                        }
                    >
                        <NavDropdown.Item
                            onClick={() => {
                                onChangeUser(null);
                                navigate("/");
                            }}
                        >
                            Sair
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
