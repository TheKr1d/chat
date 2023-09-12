import { createSlice } from "@reduxjs/toolkit";
import { getUsername_LS } from "../utils/localStorage";
import _ from "lodash";

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: []
    },
    reducers: {
        addMessage(state, action) {
            state.messages.push({
                text: action.payload,
                "username": getUsername_LS(),
                "id": _.uniqueId()
            })
        },
        addMessages(state, action) { },
    }
})

export const { addMessage, addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;