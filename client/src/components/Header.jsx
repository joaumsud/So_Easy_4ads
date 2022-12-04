import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useUser } from "../context/UserProvider";

const Header = () => {
    const { onChange } = useUser();
    return (
        <Navbar bg="light" variant="light" className="shadow-sm">
            <Container>
                <Nav className="m-auto">
                    <Nav.Link href="#">
                        <i className="bi-book-half fs-2 text-purple"></i>
                    </Nav.Link>
                    <NavDropdown
                        title={
                            <i className="bi-person-circle fs-2 text-purple"></i>
                        }
                    >
                        <NavDropdown.Item href="#">Ação 1</NavDropdown.Item>
                        <NavDropdown.Item href="#">Ação 2</NavDropdown.Item>
                        <NavDropdown.Item href="#">Ação 3</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => onChange(null)}>
                            Sair
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
