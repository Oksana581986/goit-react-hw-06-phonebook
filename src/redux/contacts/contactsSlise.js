import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contacts: [],
    filter: '',
}

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
    reducers: {
    addContact(state, action) {
    state.contacts.push(action.payload);
    },
    removeContact(state, action) {
    state.contacts = state.contacts.filter(
    contact => contact.id !== action.payload
)
    },
    setFilter(state, action) {
    state.filter = action.payload;

    },
  },
});

export const { addContact, removeContact, setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;


// export const contactsReducer = (state = InitialState, action) => {
//     switch (action.type) {
//     case 'contacts/addContact': {
//     return {...state, contacts: [...state.contacts, action.payload] };
//     }
//     case 'contacts/removeContact': {
//         return {...state, contacts: state.contacts.filter(contact => contact.id !== action.payload), };
//     }
//     case 'contacts/setFilter': {
//         return {...state, filter: action.payload };
//     }
//     default: 
//     return state;
// }
// };

// export const addContact = (payload) => {
//     return {
//         type: 'contacts/addContact',
//         payload
//     }
// }

// export const removeContact = (payload) => {
//     return {
//         type: 'contacts/removeContact',
//         payload
//     }
// }

// export const setFilter = (payload) => {
//     return {
//         type: 'contacts/setFilter',
//         payload
//     }
// }