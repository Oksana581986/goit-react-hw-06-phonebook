import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, removeContact, setFilter } from 'redux/contacts/contactsSlise';
import { ContactForm } from 'components/contactForm/ContactForm';
import { Filter } from 'components/filter/Filter';
import { ContactList } from 'components/contactList/ContactList';


export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((store) => store.contacts.contacts);
  const filter = useSelector((store) => store.contacts.filter);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const loadContactsFromLocalStorage = () => {
      const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
      dispatch(addContact(storedContacts));
    };

    loadContactsFromLocalStorage();
  }, [dispatch]);

  useEffect(() => {
    const saveContactsToLocalStorage = () => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    };

    saveContactsToLocalStorage();
  }, [contacts]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const lowerCaseName = name.toLowerCase();

    if (contacts.some((contact) => contact.name.toLowerCase() === lowerCaseName)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    setName('');
    setNumber('');
    const action = addContact(newContact);
    dispatch(action);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    const action = setFilter(value);
    dispatch(action);
  };

  const handleDeleteContact = (id) => {
    const action = removeContact(id);
    dispatch(action);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} name={name} number={number} onChange={handleChange} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};
