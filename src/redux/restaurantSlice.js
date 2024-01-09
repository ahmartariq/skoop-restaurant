import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
    data: {}
  }

  export const restaurantSlice = createSlice({
    name: 'restaurantslider',
    initialState,
    reducers: {
        toggleRestaurant: (state) => {
            state.value = !state.value;
        },
        setRestaurant: (state, action) => {
            state.value = action.payload;
        },
        setRestaurantData: (state, action) => {
            state.data = action.payload;
        }
    },
  })
  
    // Action creators are generated for each case reducer function
    export const { toggleRestaurant , setRestaurant, setRestaurantData } = restaurantSlice.actions

    export default restaurantSlice.reducer