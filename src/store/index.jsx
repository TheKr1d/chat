import { configureStore } from "@reduxjs/toolkit";
import chanelsReducer from "./chanelsSlice";
import messagesSlice from "./messagesSlice";

export default configureStore({
    reducer: {
        chanels: chanelsReducer,
        messages: messagesSlice
    }
})