import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
    data: {}
  }

  export const categorySlice = createSlice({
    name: 'categoryModal',
    initialState,
    reducers: {
        toggleCategory: (state) => {
            state.value = !state.value;
        },
        setCategory: (state, action) => {
            // if state value if false clear the data
            if (!state.value) {
                state.data = {};
            }
            state.value = action.payload;
        },
        setCategoryData: (state, action) => {
            state.data = action.payload;
        },
    },
  })
  
    // Action creators are generated for each case reducer function
    export const { toggleCategory , setCategory, setCategoryData } = categorySlice.actions

    export default categorySlice.reducer