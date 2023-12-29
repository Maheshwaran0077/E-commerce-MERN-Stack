import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "user",
    initialState: {
        loading: true,
        isAuthendicated: false
    },
    reducers: {
        loginRequest(state, action) {
            return {
                ...state,
                // the state will hold the initial initialState
                loading: true,
            }
        },
        loginSuccess(state, action) {
            return {

                loading: false,
                isAuthendicated: true,
                user: action.payload.user


            }
        },
        loginFaild(state, action) {
            return {
                ...state,
                loading: false,

                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,

                error: null
            }
        },
        registerRequest(state, action) {
            return {
                ...state,
                // the state will hold the initial initialState
                loading: true,
            }
        },
        registerSuccess(state, action) {
            return {

                loading: false,
                isAuthendicated: true,
                user: action.payload.user


            }
        },
        registerFaild(state, action) {
            return {
                ...state,
                loading: false,

                error: action.payload
            }
        },
        loadUserRequest(state, action) {
            return {
                ...state,
                // the state will hold the initial initialState
                isAuthendicated: false,
                loading: true,
            }
        },
        loadUserSuccess(state, action) {
            return {

                loading: false,
                isAuthendicated: true,
                user: action.payload.user


            }
        },
        loadUserFaild(state, action) {
            return {
                ...state,
                loading: false,
             }
        },
        logOutSuccess(state, action) {
            return {

                loading: false,
                isAuthendicated: false,


            }
        },
        logOutFaild(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },

        updateProfileRequest(state, action) {
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updateProfileSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isUpdated: true
            }
        },
        updateProfileFaild(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUpdateProfile(state, action) {
            return {
                ...state,
                isUpdated: false
            }
        },
        updatePasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updatePasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                 isUpdated: true
            }
        },
        updatePasswordFaild(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
       forgotPasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                message:null

             }
        },
        forgotPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message:action.payload.message
             }
        },
        forgotPasswordFaild(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        resetPasswordRequest(state, action) {
            return {
                ...state,
                loading: true,

             }
        },
        resetPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthendicated:true,
                user:action.payload.user
             }
        },
        resetPasswordFaild(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        


    }

})

const { actions, reducer } = authSlice

export const { loginRequest,
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
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFaild,
    clearUpdateProfile,
     updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFaild,
forgotPasswordRequest,
forgotPasswordSuccess,
forgotPasswordFaild,
resetPasswordRequest,
resetPasswordSuccess,
resetPasswordFaild} = actions

export default reducer;