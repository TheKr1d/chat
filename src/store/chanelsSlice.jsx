import { createSlice } from "@reduxjs/toolkit";

const chanelsSlice = createSlice({
    name: 'chanels',
    initialState: {
        chanels: []
    },
    reducers: {
        addChanel(state, action) {},
        addChanels(state, action) {
            state.chanels = action.payload;
            //action.payload.map((item) => console.log(item));
            //state.chanels.push(...action.payload)
            //action.payload.forEach((item) => state.chanels.push({...item, state: null}));
        },
        removeChanels(state, action) {},
        setActiveChanels(state, action) {}
    }
})

export const {addChanels} = chanelsSlice.actions;
export default chanelsSlice.reducer;