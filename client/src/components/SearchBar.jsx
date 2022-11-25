import Form from "react-bootstrap/Form";

const SearchBar = ({ searchTerm, onTyping, onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(e);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="position-relative">
                <i className="bi-search fs-4 position-absolute top-50 ms-4 translate-middle"></i>
                <Form.Control
                    type="text"
                    placeholder="Buscar aluno por nome, RA ou turma"
                    className="p-3 ps-5 rounded-pill shadow-sm fs-5"
                    value={searchTerm}
                    onChange={onTyping}
                />
            </div>
        </Form>
    );
};

export default SearchBar;
