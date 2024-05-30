import { selectNameFilter } from "./filtersSlice";
import { createSelector } from "@reduxjs/toolkit";


export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter], (contacts, nameFilter) => {
        return contacts.filter(contact =>
            typeof contact.name === 'string' &&
            contact.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }
);