import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
    data: {}
  }

  export const dealSlice = createSlice({
    name: 'dealModal',
    initialState,
    reducers: {
        toggleDeal: (state) => {
            state.value = !state.value;
        },
        setDeal: (state, action) => {
            // if state value if false clear the data
            if (!state.value) {
                state.data = {};
            }
            state.value = action.payload;
        },
        setDealData: (state, action) => {
            state.data = action.payload;
        },
    },
  })
  
    // Action creators are generated for each case reducer function
    export const { toggleDeal , setDeal, setDealData } = dealSlice.actions

    export default dealSlice.reducer