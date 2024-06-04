import Modal from 'react-modal';
import EditForm from '../EditForm/EditForm';

Modal.setAppElement('#root');

export default function ToEdit({ isOpen, onRequestClose, initialValues }) {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
            >
                <h2>Edit your contact</h2>
                <EditForm
                    initialValues={initialValues}
                    onRequestClose={onRequestClose} />
            </Modal>
        </>
    )
}