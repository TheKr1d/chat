import { io } from "socket.io-client";
import { getToken_LS } from "../utils/localStorage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const socket = io();

//export const socketConnect = () => socket.connect();
//export const socketDisconnect = () => socket.disconnect();

export const responceSocket = createAsyncThunk("channels/getChannels", async () => {
    let ii = '';
    return await axios.get('/api/v1/data', {
        headers: {
            Authorization: `Bearer ${getToken_LS()}`,
        },
    })
        .then((response) => {
            return response.data;
            //console.log(response.data)
            //const { channels, currentChannelId } = response.data;
            //dispatch(addChanels({ channels, currentChannelId }));
            //console.log(response.data); // => { channels: [...], currentChannelId: 1, messages: [] }
        })
});

const initialState = {loadingState: 'idle', error: null};

const slice = createSlice({
  name: "responceSocket",
  initialState,
  reducers: {
  },
  extraReducers: {
    [responceSocket.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.loadingState = 'idle';
        state.error = null;
    }
  }
});

export default slice.reducer;