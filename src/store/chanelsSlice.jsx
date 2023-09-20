import { createSlice } from "@reduxjs/toolkit";
import { responceSocket } from "./asyncRequests";

const chanelsSlice = createSlice({
    name: 'chanels',
    initialState: {
        chanels: [],
        currentChannel: {
            id: null,
            name: ''
        }
    },
    reducers: {
        addChanel(state, action) { },
        addChanels(state, action) {
            const { channels, currentChannelId } = action.payload;
            const modificationChannels = channels.map((item) => item.id === currentChannelId ? { ...item, state: 'active' } : { ...item, state: null });
            const currentChannel = channels.filter((item) => item.id === currentChannelId)[0];

            state.chanels = modificationChannels;
            state.currentChannel.id = currentChannel.id;
            state.currentChannel.name = currentChannel.name;
        },
        removeChanels(state, action) { },
        setActiveChanels(state, action) {
            const currentChannelId = action.payload;
            const modifiedChannels = state.chanels.map((item) => item.id === currentChannelId ? { ...item, state: 'active' } : { ...item, state: null })
            const currentChannel = state.chanels.filter((item) => item.id === currentChannelId)[0];

            state.chanels = modifiedChannels;
            state.currentChannel.id = currentChannel.id;
            state.currentChannel.name = currentChannel.name;

        }
    },
    extraReducers: {
        [responceSocket.fulfilled]: (state, action) => {
            const { channels, currentChannelId } = action.payload;
            const modificationChannels = channels.map((item) => item.id === currentChannelId ? { ...item, state: 'active' } : { ...item, state: null });
            const currentChannel = channels.filter((item) => item.id === currentChannelId)[0];

            state.chanels = modificationChannels;
            state.currentChannel.id = currentChannel.id;
            state.currentChannel.name = currentChannel.name;
        }
      }
})

export const { addChanels, setActiveChanels } = chanelsSlice.actions;
export default chanelsSlice.reducer;