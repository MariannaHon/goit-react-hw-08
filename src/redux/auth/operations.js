import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = 'https://phonebook-db-d0ot.onrender.com/';

const setAuthHeader = (accessToken) => {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};


export const register = createAsyncThunk('auth/register',
    async ({ name, email, password }, thunkAPI) => {
        try {
            const response = await axios.post('auth/register', { name, email, password });
            setAuthHeader(response.data.data.accessToken);
            return response.data;
        } catch (error) {
            toast.error('Something went wrong :( Try again later.');
            return thunkAPI.rejectWithValue(error.response.data.message);

        }
    }
);


export const logIn = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await axios.post('auth/login', { email, password });
            console.log(response.data);
            setAuthHeader(response.data.data.accessToken);
            return response.data;
        } catch (error) {
            console.log(error.response?.data);
            toast.error('Something went wrong :( Try again later.');
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axios.post('auth/logout');
        clearAuthHeader();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.accessToken;

    console.log(persistedToken);

    if (persistedToken === null) {
        return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
        setAuthHeader(persistedToken);
        const response = await axios.get('auth/refresh');
        console.log(response.data);
        return response.data;
    } catch (error) {
        toast.error('Something went wrong :( Try to reload your page.');
        return thunkAPI.rejectWithValue(error.message);
    }
}
);

