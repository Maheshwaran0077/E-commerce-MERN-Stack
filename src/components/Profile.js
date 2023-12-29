import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Profile = () => {
    const { user, isAuthendicated } = useSelector(state => state.authState)

    return (
        <Fragment>
            <div className="row justify-content-around mt-5 user-info">
                <div className="col-12 col-md-3">
                    <figure className='avatar avatar-profile'>
                        <img className="rounded-circle img-fluid" src={user.avatar ?? "/images/defaultImg.png"} alt='' />
                    </figure>
                    <Link to="/updateProfile" id="edit_profile" className="btn btn-primary btn-block my-5">
                        Edit Profile
                    </Link>
                </div>

                <div className="col-12 col-md-5">
                    <h4>Full Name</h4>
                    <p>{user.name}</p> 

                    <h4>Email Address</h4>
                    <p>{user.email}</p>
                    <h4>Joined</h4>
                    <small>{String(user.createdAt).substring(0,10)}</small>

                    
                    <Link to="/Orders" className="btn btn-danger btn-block mt-5">
                    My Orders
                    </Link>
                    <Link to="/updatePassword" className="btn btn-primary btn-block mt-3">
                        Change Password
                    </Link>
                </div>
            </div>
        </Fragment>)
}

export default Profile