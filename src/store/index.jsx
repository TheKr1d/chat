import { configureStore } from "@reduxjs/toolkit";
import chanelsReducer from "./chanelsSlice";

export default configureStore({
    reducer: {
        chanels: chanelsReducer
    }
})