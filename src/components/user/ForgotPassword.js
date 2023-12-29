import React, { Fragment, useEffect, useState } from 'react'
import { forgotPassword as forgotPasswordAction,clearAuthError } from "../../actions/UserAction"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const {error,message,isUpdated,user}=useSelector(state=>state.authState)
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('email', email)
        dispatch(forgotPasswordAction(formData))
    }
    useEffect(()=>{
        if(message){
            toast(message,{
                type:'success',
                position:toast.POSITION.TOP_RIGHT
            })
            setEmail('')
            return
        }
        if(error)  {
            toast(error, {
                position: toast.POSITION.TOP_RIGHT,
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    },[message,error,dispatch])
    return (
        <Fragment>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Send Email
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}
