import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import s from './App.module.css';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(
    () => localStorage.setItem('contacts', JSON.stringify(contacts)),
    [contacts]
  );

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };

  const submitContactForm = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(contacts => [...contacts, { id: nanoid(), name, number }]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmit={submitContactForm} />
      <h2 className={s.title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getFiltredContacts()}
        onDeleteContact={deleteContact}
      />
    </>
  );
}

export default App;
