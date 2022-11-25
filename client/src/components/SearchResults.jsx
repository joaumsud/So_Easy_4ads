import Modal from "react-bootstrap/Modal";

function SearchResults({ show, onHide, children }) {
    return (
        <>
            <Modal show={show} onHide={onHide} scrollable={true} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Resultados</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        </>
    );
}

export default SearchResults;
