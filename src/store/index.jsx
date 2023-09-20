import { configureStore } from "@reduxjs/toolkit";
import chanelsReducer from "./chanelsSlice";
import messagesSlice from "./messagesSlice";
import responseSocket from "./asyncRequests";

export default configureStore({
    reducer: {
        chanels: chanelsReducer,
        messages: messagesSlice,
        response: responseSocket
    }
})