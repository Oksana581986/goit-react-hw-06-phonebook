import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact, setFilter } from '../../redux/contacts/contactsSlise';
import css from './ContactList.module.css';

  const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((store) => store.contacts.contacts);
  const filter = useSelector((store) => store.contacts.filter);

  const handleDeleteContact = (id) => {
    const action = removeContact(id);
    dispatch(action);
  };
   const handleFilterChange = (e) => {
    const { value } = e.target;
    const action = setFilter(value);
    dispatch(action);
  };


  const filteredContacts = contacts.filter((contact) =>
  contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

return (
    <div>
      <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter contacts" />
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button className={css.delete} onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

  export { ContactList };