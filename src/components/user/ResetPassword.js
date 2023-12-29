import React, { Fragment, useState, useEffect } from 'react'
import {  clearAuthError, resetPassword as resetPassCode } from '../../actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ResetPassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmsPassword] = useState('')
    const {token}=useParams()
    const { error, isUpdated, isAuthendicated } = useSelector(state => state.authState)
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)
        dispatch(resetPassCode(formData,token))
    }
    useEffect(() => {
        if (isAuthendicated) {
            navigate('/')
        }
        if (isUpdated) {
            toast('password updated successfully', {
                type: 'success',
                position: toast.POSITION.TOP_RIGHT,
            })
            return;
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.TOP_RIGHT, 
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }

    }, [isAuthendicated, isUpdated,dispatch,navigate,error])

    return (
        <Fragment>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">New Password</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={e => setConfirmsPassword(e.target.value)} />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Set Password
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>)
}

export default ResetPassword