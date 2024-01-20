import React from 'react';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/contacts/contactsSlise';
import { useDispatch, useSelector } from 'react-redux';
import css from './ContactForm.module.css';
import { useState } from 'react';


const ContactForm = () => {
  const contacts = useSelector((store) => store.contacts.contacts);
  const dispatch = useDispatch();
  const [name, setName] = useState(''); 
  const [number, setNumber] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const lowerCaseName = name.toLowerCase();

    if (contacts.some((contact) => contact.name.toLowerCase() === lowerCaseName)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    const action = addContact(newContact);
    dispatch(action);
    setName('');
    setNumber('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  return (
    <form className={css.formcontact} onSubmit={handleSubmit}>
      <label className={css.labelname}>
        Name:
        <input className={css.inputname} type="text" name="name" value={name} onChange={handleChange} required />
      </label>
      <br />
      <label className={css.labelnumber}>
        Number:
        <input className={css.inputnumber} type="tel" name="number" value={number} onChange={handleChange} required />
      </label>
      <br />
      <button className={css.addcontact} type="submit">
        Add contact
      </button>
    </form>
  );
};

  export { ContactForm };