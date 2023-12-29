import axios from "axios"
import { AdminProductsFaild, AdminProductsRequest, AdminProductsSuccess, AdminproductsRequest, ProductsFaild, ProductsSuccess, productsRequest } from "../slices/productsSlices"
//they differ
import { ProductFaild, ProductSuccess, createReviewFaild, createReviewRequest, createReviewSuccess, deleteProductFaild, deleteProductRequest, deleteProductSuccess, newProductFaild, newProductRequest, newProductSuccess, productRequest, updateProductFaild, updateProductRequest, updateProductSuccess } from "../slices/productSlices"
import { updateOrderRequest, updateOrderSuccess } from "../slices/OrderSlice"

export const getProducts = (keyword, price, category, ratings, currentPage) => async (dispatch) => {

    try {
        dispatch(productsRequest())
        let link = `/api/v1/products?page=${currentPage}`
        if (keyword) {
            link += `&keyword=${keyword}`
        }

        if (price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if (category) {
            link += `&category=${category}`
        }
        if (ratings) {
            link += `&ratings=${ratings}`
        }
        const { data } = await axios.get(link)
        dispatch(ProductsSuccess(data))
        // data will hold the json data 

    } catch (error) {
        dispatch(ProductsFaild(error.response.data.message))


    }
}




export const getProduct = id => async (dispatch) => {

    try {
        dispatch(productRequest())
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch(ProductSuccess(data))
        // data will hold the json data

    } catch (error) {
        dispatch(ProductFaild(error.response.data.message))


    }
}


export const createReview = ReviewData => async (dispatch) => {

    try {
        dispatch(createReviewRequest())
        const config = {
            headers: {
                "content-type": "application/json"
            }
        }
        const { data } = await axios.put(`/api/v1/review`, ReviewData, config)
        dispatch(createReviewSuccess(data))
        // data will hold the json data

    } catch (error) {
        dispatch(createReviewFaild(error.response.data.message)) 

   
    }
}

//Admin Product List
export const adminGetAllProduct = async (dispatch) => { 
    try {
        dispatch(AdminProductsRequest());
        const { data } = await axios.get('/api/v1/admin/getProducts')
        dispatch(AdminProductsSuccess(data))
    } catch (error) {
        dispatch(AdminProductsFaild(error.response.data.message))

    }

}

export const createNewProduct = productData => async (dispatch) => { 
    try {
        dispatch(newProductRequest());
        const { data } = await axios.post('/api/v1/products/new',productData)
        dispatch(newProductSuccess(data))
    } catch (error) {
        dispatch(newProductFaild(error.response.data.message))

    }

}
export const deleteProduct = id => async (dispatch) => { 
    try {
        dispatch(deleteProductRequest());
          await axios.delete(`/api/v1/admin/deleteProduct/${id}`)
        dispatch(deleteProductSuccess())
    } catch (error) {
        dispatch(deleteProductFaild(error.response.data.message))

    }

}
// export const updateProduct = (id,productData) => async (dispatch) => { 
//     try {
//         dispatch(updateProductRequest());
//         const { data } = await axios.put(`/api/v1/admin/updateProduct/${id}`,productData)
//         dispatch(updateProductSuccess(data))
//     } catch (error) {
//         dispatch(updateProductFaild(error.response.data.message))

//     }

// }
export const updateProduct  =  (id, productData) => async (dispatch) => {

    try {  
        dispatch(updateProductRequest()) 
        const { data }  =  await axios.put(`/api/v1/admin/updateProduct/${id}`, productData);
        dispatch(updateProductSuccess(data))
    } catch (error) {
        //handle error
        dispatch(updateProductFaild(error.response.data.message))
    }
    
}