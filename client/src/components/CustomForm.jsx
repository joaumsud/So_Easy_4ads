import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const CustomForm = ({
    children,
    error = false,
    success = false,
    error_message,
    success_message,
    onCloseSuccessAlert,
    onCloseErrorAlert,
    onSubmit,
}) => {
    return (
        <Form
            onSubmit={onSubmit}
            className="mb-3"
            encType="multipart/form-data"
        >
            {children}
            <Alert
                show={success}
                variant="success"
                onClose={onCloseSuccessAlert}
                dismissible
            >
                {success_message}
            </Alert>
            <Alert
                show={error}
                variant="danger"
                onClose={onCloseErrorAlert}
                dismissible
            >
                {error_message}
            </Alert>
        </Form>
    );
};

export default CustomForm;
