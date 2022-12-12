import Modal from "react-bootstrap/Modal";

function Lightbox({ title, show, onHide, children }) {
    return (
        <>
            <Modal show={show} onHide={onHide} scrollable={true} centered className='m-auto'>
                <Modal.Header closeButton>
                    <Modal.Title className="text-purple">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='m-auto my-4 w-100'>{children}</Modal.Body>
            </Modal>
        </>
    );
}

export default Lightbox;
