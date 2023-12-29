import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./MetaData";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import { getProducts } from "../actions/ProductsActions";
import { Loader } from "../components/layouts/Loader";
import Product from "./Product";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [priceChanged, setPriceChanged] = useState();
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { keyword } = useParams();

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };
  const categories = [
    "Beauty/Health",
    "Clothes/Shoes",
    "Mobile Phones",
    "Accessories",
    "Electronics",
    "Headphones",
    "Laptops",
    "Foods",
    "Books",
    "Sports",
    "Home",
    "Outdoor",
  ];
  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    dispatch(
      getProducts(keyword, priceChanged, category, ratings, currentPage)
    );
  }, [error, dispatch, keyword, priceChanged, currentPage, category, ratings]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Home page"} />
          <h1 id="products_heading">Searched Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-6  col-md-3 mb-5 mt-5">
                <div
                  className="px-5"
                  onMouseUp={() => {
                    setPriceChanged(price);
                  }}
                >
                  {/* price filter */}
                  <Slider
                    range={true}
                    marks={{
                      1: "$1",
                      1000: "$1000",
                    }}
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(price) => {
                      setPrice(price);
                    }}
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={`$${renderProps.props["aria-valuenow"]}`}
                        >
                          <div {...renderProps.props}> </div>
                        </Tooltip>
                      );
                    }}
                  />
                  <hr />
                  {/* catagory filter */}

                  <div className="mt-5">
                    <div className="mb-3">
                      <h2>Category</h2>
                      <ul className="pl-0">
                        {categories.map((category) => (
                          <li
                            style={{
                              cursor: "pointer",
                              listStyle: "none",
                            }}
                            key={category}
                            onClick={() => setCategory(category)}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* rating filter */}
                  <hr />
                  <div className="mt-5">
                    <div className="mb-3">
                      <h2>Rating</h2>
                      <ul className="pl-0">
                        {[5, 4, 3, 2, 1].map((ratings) => (
                          <li
                            style={{
                              cursor: "pointer",
                              listStyle: "none",
                            }}
                            key={ratings}
                            onClick={() => setRatings(ratings)}
                          >
                            <div className="rating-outer">
                              <div
                                className="rating-inner"
                                style={{
                                  width: `${ratings * 20}%`,
                                }}
                              ></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6  col-md-9">
                <div className="row">
                  {products &&
                    products.map((product) => (
                      <Product col={4} key={product._id} product={product} />
                    ))}
                </div>
              </div>
            </div>
          </section>

          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
}
