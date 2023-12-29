import React, { Fragment } from 'react'

function ProductReview({reviews}) {
    return (
        <Fragment>
            <div className="reviews w-75 container">
                <h3>Other's Reviews:</h3>
                <hr />

                 {reviews && reviews.map(review => (
                    <div key={review._id} className="review-card my-3">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{width:`${review.rating/5*100}%`}}></div>
                        </div>
                        <p className="review_user">by {review.user.name}</p>
                        <p className="review_comment">{review.comment}</p>

                        <hr />
                    </div>  
                ))}

            </div>
        </Fragment>)
}

export default ProductReview