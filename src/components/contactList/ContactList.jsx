import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeContact } from '../../redux/contacts/contactsSlise';
import css from './ContactList.module.css';

  const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((store) => store.contacts.contacts);
  const filter = useSelector((store) => store.contacts.filter);

  const handleDeleteContact = (id) => {
    const action = removeContact(id);
    dispatch(action);
  };

  const filteredContacts = contacts.filter((contact) =>
  contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

return (
    <div>
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