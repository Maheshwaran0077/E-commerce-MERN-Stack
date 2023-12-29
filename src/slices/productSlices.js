import { createSlice } from "@reduxjs/toolkit";

const productSlices = createSlice({
  name: "product",
  initialState: {
    loading: false,
    product: {},
    isReviewSubmitted: false,
    isProductCreated: false,
    isProductDeleted:false,
    isProductUpdate:false
  },
  reducers: {
    productRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    ProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        //                    fetch the product field from db
      };
    },
    ProductFaild(state, action) {
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    },
    createReviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    createReviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isReviewSubmitted: true,
        //                    fetch the product field from db
      };
    },
    clearReviewSubmitted(state, action) {
      return {
        ...state,
        isReviewSubmitted: false,
        //                    fetch the product field from db
      };
    },
    createReviewFaild(state, action) {
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    clearProduct(state, action) {
      return {
        ...state,
        product: {},
      };
    },
    newProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    newProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        //                    fetch the product field from db
        isProductCreated: true,
      };
    },
    newProductFaild(state, action) {
      return {
        ...state,
        loading: true,
        error: action.payload,
        isProductCreated: false,
      };
    },
    clearProductCreated(state, action) {
        return {
          ...state,
          isProductCreated: false,
        };
      },
    
    deleteProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isProductDeleted: true,
      };
    },
    deleteProductFaild(state, action) {
      return {
        ...state,
        loading: true,
        error: action.payload,
       };
    },
    // clearProductCreated(state,action){
    //     return{
    //         ...state,
    //         isProductedCreated:true

    //     }
    // }
    clearProductDeleted(state, action) {
      return {
        ...state,
        isProductDeleted: false,
      };
    },
    updateProductRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    updateProductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        product: action.payload.product,
        //                    fetch the product field from db
        isProductUpdate: true,
      };
    },
    updateProductFaild(state, action) {
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    },
    clearProductUpdated(state, action) {
        return {
          ...state,
          isProductUpdate: false,
        };
      },
    
  },
});

const { actions, reducer } = productSlices;

export const {
  productRequest,
  ProductSuccess,
  ProductFaild,
  createReviewRequest,
  createReviewSuccess,
  createReviewFaild,
  clearError,
  clearReviewSubmitted,
  clearProduct,
  newProductRequest,
  newProductSuccess,
  newProductFaild,
  clearProductCreated,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFaild,
  clearProductDeleted,
  updateProductRequest,
  updateProductSuccess,
  updateProductFaild,
  clearProductUpdated
} = actions;

export default reducer;
