import { useState } from 'react';
import ToDelete from '../ToDelete/ToDelete'
import ToEdit from '../ToEdit/ToEdit.jsx';
import { IoPersonSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations.js";
import css from './Contact.module.css'

const Contact = ({ contact: { id, name, number } }) => {

    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [modalEditOpen, setModalEditOpen] = useState(false);

    const openModal = (contact) => {
        setModalIsOpen(true);
        setContactToDelete(contact);
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setContactToDelete(null);
    }

    const handleConfirmDelete = () => {
        if (contactToDelete) {
            dispatch(deleteContact(contactToDelete.id));
            closeModal();
        }
    }

    const openModalEdit = () => {
        setModalEditOpen(true);
    }

    const closeModalEdit = () => {
        setModalEditOpen(false);
    }

    return (
        <div className={css.container}>
            <div className={css.wrapper}>
                <p><IoPersonSharp className={css.icon} />{name}</p>
                <p><FaPhone className={css.icon} />{number}</p>
            </div>
            <button onClick={openModalEdit}>Edit</button>
            <button className={css.btn} onClick={() => openModal({ id, name, number })}>Delete</button>
            {modalIsOpen && (
                <ToDelete
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    onConfirm={handleConfirmDelete}
                    contactName={name} />
            )}
            {modalEditOpen && (
                <ToEdit
                    isOpen={modalEditOpen}
                    onRequestClose={closeModalEdit}
                    initialValues={{ id, name, number }} />
            )}
        </div>
    )
}

export default Contact;