import {configureStore,combineReducers} from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import productsReducer from "./slices/productsSlices"
import productReducer from "./slices/productSlices"
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/CardSlice"
import orderReducer from "./slices/OrderSlice"
const reducer=combineReducers({
    productsState:productsReducer,
    productState:productReducer, 
    authState:authReducer,
    cartState:cartReducer,
    orderState:orderReducer,


})
const store=configureStore({
    reducer,
    middleware:[thunk]
}) 
export default store 