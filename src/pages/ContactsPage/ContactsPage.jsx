import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/operations.js'
import { selectError, selectIsLoading } from '../../redux/contacts/selectors.js';

import ContactList from '../../components/ContactList/ContactList.jsx';
import ContactForm from '../../components/ContactForm/ContactForm.jsx';
import SearchBox from '../../components/SearchBox/SearchBox.jsx';

export default function ContactsPage() {
    const dispatch = useDispatch();

    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <div className='title'>
            {isLoading && <p>Loading tasks...</p>}
            {error && <p>{error}</p>}
            <h1>Phonebook</h1>
            <ContactForm />
            <SearchBox />
            <ContactList />
        </div>
    )
}
