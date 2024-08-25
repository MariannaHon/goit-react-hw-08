import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = "https://phonebook-db-d0ot.onrender.com/";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/contacts");
        return response.data.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message) && toast.error('Something went wrong :( Try to reload your page.');
    }
});


export const addContact = createAsyncThunk(
    "contacts/addContact",
    async ({ name, number }, thunkAPI) => {
        try {
            const response = await axios.post("/contacts", { name, number });
            thunkAPI.dispatch(fetchContacts());
            toast.success('A new contact was successfully added!')
            return response.data;

        } catch (e) {
            return thunkAPI.rejectWithValue(e.message) && toast.error('You failed to add new contact :(');
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${contactId}`);
            thunkAPI.dispatch(fetchContacts());
            return response.data && toast.success('Your contact was successfully deleted!');
        } catch (e) {
            toast.error('You failed to delete your contact :(');
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const patchContact = createAsyncThunk(
    "contacts/patchContact",
    async ({ _id, name, number }, thunkAPI) => {
        try {
            const response = await axios.patch(`/contacts/${_id}`, { name, number });
            thunkAPI.dispatch(fetchContacts());
            return response.data && toast.success('A contact was successfully changed!');
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);