import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
    data: {}
  }

  export const productSlice = createSlice({
    name: 'productModal',
    initialState,
    reducers: {
        toggleProduct: (state) => {
            state.value = !state.value;
        },
        setProduct: (state, action) => {
            // if state value if false clear the data
            if (!state.value) {
                state.data = {};
            }
            state.value = action.payload;
        },
        setProductData: (state, action) => {
            state.data = action.payload;
        },
    },
  })
  
    // Action creators are generated for each case reducer function
    export const { toggleProduct , setProduct, setProductData } = productSlice.actions

    export default productSlice.reducer