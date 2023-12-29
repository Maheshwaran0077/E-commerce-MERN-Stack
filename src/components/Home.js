import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./MetaData";
import { useDispatch, useSelector } from "react-redux";
import Pagination from 'react-js-pagination';
import Pagination from "react-js-pagination"
import { getProducts } from "../actions/ProductsActions"
import { Loader } from "./layouts/Loader"
import Product from "./Product";


import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

export default function Home() {
  // note:the pagination pack will be installed
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)
  const [currentPage, setCurrentPage] = useState(1);
   const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo)
  }
  useEffect(() => {
    if (error) {
      return (toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT
      }))
    }
    dispatch(getProducts(null,null,null,null,currentPage))
  }, [error, dispatch, currentPage])
  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <MetaData title={"Home page"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">

              {products && products.map(product => (
                <Product col={3} key={product._id} product={product} />
              ))}

            </div>
          </section>

          {productsCount > 0 && productsCount > resPerPage ?
            <div className="d-flex justify-content-center mt-5">
              <Pagination 
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={'Next'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass={'page-item'}
                linkClass={'page-link'}
              />

            </div>
            : null}

        </Fragment>
      }
    </Fragment>


  )
} 