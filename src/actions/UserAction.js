import {
    loginRequest,
    loginSuccess,
    loginFaild,
    clearError,
    registerRequest,
    registerSuccess,
    registerFaild,
    loadUserRequest,
    loadUserSuccess,
    loadUserFaild,
    logOutSuccess,
    logOutFaild,
    updateProfileFaild,
    updateProfileSuccess,
    updateProfileRequest,
    updatePasswordFaild,
    updatePasswordSuccess,
    updatePasswordRequest,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFaild,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFaild
    
    
} from "../slices/authSlice"
import axios from "axios"

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch(loginRequest)
        const { data } = await axios.post(`/api/v1/login`, { email, password })
        dispatch(loginSuccess(data))

    } catch (error) {
        dispatch(loginFaild(error.response.data.message))
    } 
}

export const clearAuthError = dispatch => {
    dispatch(clearError())

}
export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            header: {
                'Content-type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post(`api/v1/register`, userData, config)
        dispatch(registerSuccess(data))

    } catch (error) {
        dispatch(registerFaild(error.response.data.message))
    }
}

export const loadUser = async (dispatch) => {

    try {
        dispatch(loadUserRequest())

        const { data } = await axios.get(`api/v1/userProfile`)
        dispatch(loadUserSuccess(data))

    } catch (error) {
        dispatch(loadUserFaild(error.response.data.message))
    }
}

export const logOut = async (dispatch) => {

    try {
        await axios.get(`api/v1/logout`)
        dispatch(logOutSuccess())

    } catch (error) {
        dispatch(logOutFaild)
    }
}

export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/update`, userData, config);
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFaild(error.response.data.message))
    }

}
export const updatePassword = (formData) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        await axios.put('api/v1/password/change', formData,config)
        dispatch(updatePasswordSuccess())

    } catch (error) {
        dispatch(updatePasswordFaild(error.response.data.message))
    }
}

export const forgotPassword = (formData) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data}=await axios.post('/api/v1/password/forgot', formData,config)
        dispatch(forgotPasswordSuccess(data))

    } catch (error) {
        dispatch(forgotPasswordFaild(error.response.data.message))
    }
}

export const resetPassword = (formData,token) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const {data}=await axios.post(`/api/v1/password/reset/${token}`, formData,config)
        dispatch(resetPasswordSuccess(data))

    } catch (error) {
        dispatch(resetPasswordFaild(error.response.data.message))
    }
}
