import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/contacts/contactsSlise';
import css from './Filter.module.css';

const Filter = ({ value }) => {
 const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const { value } = e.target;
    const action = setFilter(value);
    dispatch(action);
  };

  return (
    <label className={css.labelfilter}>
      Filter contacts by name:
      <input className={css.inputfilter} type="text" name="filter" value={value} onChange={handleFilterChange} />
    </label>
  );
};

  export { Filter };