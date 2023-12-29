import React, { Fragment, useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createReview, getProduct } from '../actions/ProductsActions'
import { useParams } from 'react-router-dom'
import { Loader } from './layouts/Loader'
import { Carousel } from "react-bootstrap"
import MetaData from './MetaData'
import { addCartItem } from '../actions/CartActions'
import { Modal } from "react-bootstrap"
import { clearError, clearProduct, clearReviewSubmitted } from '../slices/productSlices'
import {toast} from "react-toastify"
import ProductReview from './ProductReview'

const ProductDetails = () => {

    const { product={}, loading ,isReviewSubmitted,error} = useSelector((state) => state.productState)
  const {user} =useSelector((state)=>state.authState)
    const dispatch = useDispatch()
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState("")


    function increaseQty() {
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.stock && product.stock !== 0) return
        const qty = count.valueAsNumber + 1
        setQuantity(qty)
    }
    function decreaseQty() {
        const count = document.querySelector('.count')
        if (count.valueAsNumber == 1) return
        const qty = count.valueAsNumber - 1
        setQuantity(qty)

    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const reviewHandler = () => {
        const formData = new FormData()
        formData.append("rating", rating)
        formData.append("comment", comment)
        formData.append("productId", id)//id is taken from useParams
        dispatch(createReview(formData))

    }
    useEffect(() => {
        if(isReviewSubmitted){
            handleClose()
            toast('Review Submitted successfully',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen:()=>{dispatch(clearReviewSubmitted())}

              })
               
        }
        if(error){
            handleClose()
            toast(error,{
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen:()=>{dispatch(clearError())}

              })
              return
        }
        if(!product._id || isReviewSubmitted){

            dispatch(getProduct(id))
        }
        return ()=>{
            dispatch(clearProduct())
        }

    }, [dispatch, id,error,isReviewSubmitted ])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={product.name} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause="hover">
                                {product.images && product.images.map(image =>
                                    <Carousel.Item key={image._id}>
                                        <img src={image.image} className='d-block w100' alt={image.name} height="500" width="500" />

                                    </Carousel.Item>
                                )}

                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product {product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}
                                ></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button" id="cart_btn"
                                disabled={product.stock == 0 ? true : false}
                                onClick={() => {
                                    dispatch(addCartItem(product._id, quantity))

                                }}
                                className="btn btn-primary d-inline ml-4">Add to Cart</button>

                            <hr />

                            <p>Status: <span id="stock_status" className={product.stock > 0 ? "greenColor" : "redColor"}>{product.stock > 0 ? "In stock" : "Out Of stock"}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

{
    user ?
                            <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" onClick={handleShow} data-target="#ratingModal">
                                Submit Your Review
                            </button>:
                            <div className='alert alert-danger mt-5'>Login to Post Review</div>
}

                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea name="review" id="review" className="form-control mt-3">

                                                    </textarea>

                                                    <button className={"btn my-3 float-right review-btn px-4 text-white"} data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Submit Your Review</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <ul className="stars" >
                                                {
                                                    [1, 2, 3, 4, 5].map(star => (

                                                        <li
                                                            value={star}
                                                            onClick={() => setRating(star)}
                                                            className={`star ${star <= rating ? "orange" : ""}`}
                                                            onMouseOver={(e) => e.target.classList.add("yellow")}
                                                            onMouseOut={(e) => e.target.classList.remove("yellow")}

                                                        ><i className="fa fa-star"></i></li>
                                                    ))
                                                }
                                            </ul>

                                            <textarea onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3">

                                            </textarea>

                                            <button disabled={loading} onClick={reviewHandler} className={"btn my-3 float-right review-btn px-4 text-white"} data-dismiss="modal" aria-label="Close">Submit</button>
                                        </Modal.Body>

                                    </Modal>
                                </div>

                            </div>

                        </div>
                    </div>
                    {product.reviews && product.reviews.length>0?
                    <ProductReview reviews={product.reviews}/>:
                    null
                    }
                </Fragment>
            }
        </Fragment>


    )
}

export default ProductDetails