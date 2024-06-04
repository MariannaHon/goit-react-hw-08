import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ToDelete({ isOpen, onRequestClose, onConfirm, contactName }) {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
            >
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete {contactName}</p>
                <div>
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onRequestClose}>No</button>
                </div>
            </Modal>
        </>
    )
}