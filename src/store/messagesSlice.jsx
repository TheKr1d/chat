import { createSlice } from "@reduxjs/toolkit";
import { getUsername_LS } from "../utils/localStorage";
import { responceSocket } from "./asyncRequests";
//import { socket } from "./asyncRequests";
import _ from "lodash";

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: []
    },
    reducers: {
        addMessage(state, action) {
            state.messages.push({
                body: action.payload,
                "username": getUsername_LS(),
                "id": _.uniqueId()
            })
            //socket.emit('newMessage', { "body": action.payload, channelId: 1, username: getUsername_LS() })
        },
        addMessages(state, action) { },
    },
    extraReducers: {
        [responceSocket.fulfilled]: (state, action) => {

            const { messages } = action.payload;
        
            state.messages = messages;
        }
    }
})

export const { addMessage, addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;