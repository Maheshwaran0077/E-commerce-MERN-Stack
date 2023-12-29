import './App.css';
import Home from './components/Home';
import Header from './components/layouts/Header';
import Footer from './components/layouts/footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { ToastContainer } from "react-toastify"
import ProductDetails from './components/ProductDetails';
import ProductSearch from './components/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import store from "./Store";
import { loadUser } from './actions/UserAction';
import Profile from './components/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from "./components/user/ForgotPassword"
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/Cart';
import Shipping from './components/Shipping';
import ConfirmOrder from './components/ConfirmOrder';
import Payment from './components/Payment';
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/OrderSuccess';
import UserOrder from './components/UserOrder';
import OrderDetail from './components/OrderDetail';
import Dashboard  from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from "./components/admin/OrderList"
import UpdateOrder from './components/admin/UpdateOrder';

  function App() {
  const [stripeApiKey, setStripeApiKey] = useState('')
  useEffect(() => {
    store.dispatch(loadUser)
    async function getStripeKey() {
      const { data } = await axios.get("/api/v1/stripeapi")
      setStripeApiKey(data.stripeApiKey) 
    }
    getStripeKey()
  }, [])
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className='container-fluid'>
            <ToastContainer theme='dark' />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search/:keyword' element={<ProductSearch />} />
              <Route path='/Product/:id' element={<ProductDetails />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/myprofile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path='/updateProfile' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
              <Route path='/updatePassword' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
              <Route path='/password/forgot' element={<ForgotPassword />} />
              <Route path='/password/reset/:token' element={<ResetPassword />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
              <Route path='/Order/confirm' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
              <Route path='/Order/success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
              <Route path='/Orders' element={<ProtectedRoute><UserOrder /></ProtectedRoute>} />
              <Route path='/Order/:id' element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
              {/* <Route path='/admin/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
              ProductList

              {stripeApiKey && <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements></ProtectedRoute>} />}



            </Routes>
          </div>
          <Routes>
            <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
             <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute>} />
             <Route path='/admin/product/create' element={<ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute>} />
             <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>} />
             <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute>} />
             <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute>} />

          </Routes>
          <Footer />
        </HelmetProvider>

      </div>
    </Router>

  );
}  

export default App;
