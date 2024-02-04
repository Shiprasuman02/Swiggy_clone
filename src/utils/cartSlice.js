import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {

            // Vanialla (older) Redux => DON'T MUTATE STATE, returning was mandatory
            // const newState = [...state];
            // newState.items.push(action.payload);
            //return newState;


            // Redux Toolkit
            // We HAVE to mutate the state
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items.pop();
        },
        //originalStore = {items: ["pizza"]}
        clearCart: (state, action) => {
            //RTK - either Mutate the existing state or return a new State
            // state.items.length = 0;  // originalState = []

            return { items: [] }; // This new object will be replaced inside originalState = { items: []}
        },
    },
});


export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

