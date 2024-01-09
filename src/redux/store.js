import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './categorySlice'
import productReducer from './productSlice' 
import dealReducer from './dealSlice'
import skooperReducer from './SkooperSlice'
import restaurantReducer from './restaurantSlice'
import userReducer from './userSlice'
import inventoryReducer from './inventorySlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    deal: dealReducer,
    inventory: inventoryReducer,
    skooper: skooperReducer,
    restaurant: restaurantReducer,
    user: userReducer,
  },
})