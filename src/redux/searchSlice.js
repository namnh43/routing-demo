import {createSlice} from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'search',
    initialState:{textSearch: ''},
    reducers: {
        searchAction:(state,action) => {
            state.textSearch = action.payload;
        }
    }
})
export const {searchAction} = searchSlice.actions;
export default searchSlice.reducer;