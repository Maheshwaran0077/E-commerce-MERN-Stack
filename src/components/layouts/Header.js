import { Link, useNavigate } from "react-router-dom";
import Search from "../Search";
import { useDispatch, useSelector } from "react-redux"
import { Dropdown, DropdownButton, Image } from "react-bootstrap"
import { logOut } from "../../actions/UserAction";
export default function Header() {
  const dispatch = useDispatch()
  const navigation = useNavigate()

  const { user, isAuthendicated } = useSelector(state => state.authState)
  const { items: cartItems } = useSelector(state => state.cartState)
  const logOutHandler = () => {
    dispatch(logOut)
  }
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img width="150px" src="/images/logo.png" alt="amazoon img" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">

        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthendicated ? (
          <Dropdown className="d-inline">
            <Dropdown.Toggle variant="default text-white pr-5 " id="dropdown-basic">
              <figure className="avatar avatar-nav">
                <Image width="150px" src={user.avatar ?? '/images/defaultImg.png'} />
              </figure>
              <span>{user.name}</span>
              <Dropdown.Menu>
                {user.role === "admin" && <Dropdown.Item onClick={() => { navigation('/admin/dashboard') }} className="text-dark" >Dashboard</Dropdown.Item>}
                <Dropdown.Item onClick={() => { navigation('/Orders') }} className="text-dark" >My Orders</Dropdown.Item>
                <Dropdown.Item onClick={() => { navigation('/myprofile') }} className="text-dark" >My Profile</Dropdown.Item>

                <Dropdown.Item className="text-danger" onClick={logOutHandler}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Toggle>
          </Dropdown>
        ) :
          <Link to="/login" className="btn" id="login_btn">Login</Link>
        }
        <Link to={"/cart"}> <span id="cart" className="ml-3">Cart</span></Link>
        <span className="ml-1" id="cart_count">{cartItems.length}</span>
      </div>
    </nav>
  )
}