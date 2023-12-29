import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword as updatePasswordAction ,clearAuthError} from "../../actions/UserAction"
import { toast } from 'react-toastify'
function UpdatePassword() {
     
    const{isUpdated,error}=useSelector(state=>state.authState)
    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('') 

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("oldPassword", oldPassword)
            formData.append("password", password)
        dispatch(updatePasswordAction(formData))
    }
   useEffect(()=>{
    if(isUpdated) {
        toast('password updated successfully',{
            type: 'success',
            position: toast.POSITION.TOP_RIGHT,
          })
        return;
    }
    setOldPassword('')
    setPassword('')

    if(error)  {
        toast(error, {
            position: toast.POSITION.TOP_RIGHT,
            type: 'error',
            onOpen: ()=> { dispatch(clearAuthError) }
        })
        return
    }
   },[dispatch,error,isUpdated])
    return (
        <Fragment>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>
        </Fragment>)
}

export default UpdatePassword