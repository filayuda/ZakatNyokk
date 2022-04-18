import { Modal } from "react-bootstrap";

const FormModal = ({ show, handleClose, children }) => {
    return (
        <Modal show={show} onHide={handleClose} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
};

export default FormModal;