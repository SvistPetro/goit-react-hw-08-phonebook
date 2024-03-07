import { useSelector } from 'react-redux'
import ContactForm from '../components/ContactForm/ContactForm'
import ContactList from '../components/ContactList/ContactList'
import Filter from '../components/Filter/Filter'
import { selectContactList } from '../redux/contacts/selectors'


const Contacts = () => {
    const contacts = useSelector(selectContactList);

    return (
        <div>
            <h1>Phonebook</h1>
            <ContactForm />

            <h2>Contacts</h2>
            {contacts.length > 0 && <Filter />}
            <ContactList />
        </div>
    )
}

export default Contacts