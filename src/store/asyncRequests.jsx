import { io } from "socket.io-client";
import { getToken_LS } from "../utils/localStorage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const socket = io();

//export const socketConnect = () => socket.connect();
//export const socketDisconnect = () => socket.disconnect();

export const responceSocket = createAsyncThunk("channels/getChannels", async () => {
    return await axios.get('/api/v1/data', {
        headers: {
            Authorization: `Bearer ${getToken_LS()}`,
        },
    })
        .then((response) => {
            return response.data;
        })
});


export const sendMessage = async (data) => {
    await socket.emit('newMessage', (data));
};

const initialState = { loadingState: 'idle', error: null };

const slice = createSlice({
    name: "responceSocket",
    initialState,
    reducers: {
    },
    extraReducers: {
        [responceSocket.fulfilled]: (state, action) => {
            state.loadingState = 'idle';
            state.error = null;
        }
    }
});

export default slice.reducer;