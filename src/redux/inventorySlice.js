import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
    data: {}
  }

  export const inventorySlice = createSlice({
    name: 'inventoryModal',
    initialState,
    reducers: {
        toggleInventory: (state) => {
            state.value = !state.value;
        },
        setInventory: (state, action) => {
            // if state value if false clear the data
            if (!state.value) {
                state.data = {};
            }
            state.value = action.payload;
        },
        setInventoryData: (state, action) => {
            state.data = action.payload;
        },
    },
  })
  
    // Action creators are generated for each case reducer function
    export const { toggleInventory , setInventory, setInventoryData } = inventorySlice.actions

    export default inventorySlice.reducer