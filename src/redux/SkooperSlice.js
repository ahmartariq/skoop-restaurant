import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
    data: {}
  }

  export const skooperSlice = createSlice({
    name: 'skooperslider',
    initialState,
    reducers: {
        toggleSkooper: (state) => {
            state.value = !state.value;
        },
        setSkooper: (state, action) => {
            state.value = action.payload;
        },
        setSkooperData: (state, action) => {
            state.data = action.payload;
        }
    },
  })
  
    // Action creators are generated for each case reducer function
    export const { toggleSkooper , setSkooper, setSkooperData } = skooperSlice.actions

    export default skooperSlice.reducer