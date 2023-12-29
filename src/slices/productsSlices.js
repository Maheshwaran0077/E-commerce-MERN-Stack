import {  createSlice } from "@reduxjs/toolkit";

const productsSlices=createSlice({
    name: "products",
    initialState: {
        loading: false, 
    }, 
    reducers: { 
        productsRequest(state,action) {   
            return {
                loading: true,    
        } 
         },
         ProductsSuccess(state,action){
            return{ 
                
                loading: false,
                products: action.payload.products, 
                productsCount: action.payload.count,
                resPerPage : action.payload.resPerPage
 
            }
         }, 
         ProductsFaild(state,action){
            return{
                loading:true, 
                error:  action.payload
            }
         },
         AdminProductsRequest(state,action) {   
            return {
                loading: true,    
        } 
         },
         AdminProductsSuccess(state,action){
            return{ 
                
                loading: false,
                products: action.payload.products, 
                
 
            }
         }, 
         AdminProductsFaild(state,action){
            return{
                loading:true,  
                error:  action.payload
            } 
         },
         clearError(state,action){
            return{
                ...state, 
                error:  null
            }
         }
    }

})

const {actions,reducer}=productsSlices

export const {
    productsRequest,
    ProductsSuccess,
    ProductsFaild,
    AdminProductsRequest,
    AdminProductsSuccess,
    AdminProductsFaild
}=actions

export default reducer;