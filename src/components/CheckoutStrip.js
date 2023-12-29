import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function CheckoutStrip({ shipping, confirmOrder, payment }) {
    return (
        <div className="checkout-progress d-flex justify-content-center mt-5">
            {shipping ?
                <Link to="/shipping">
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Shipping Info</div>
                    <div className="triangle-active"></div>
                </Link> :
                <Link to="/shipping">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Shipping Info</div>
                    <div className="triangle-incomplete"></div>
                </Link>
            }
            {confirmOrder ?
                <Link to="/Order/confirm">
                    <div className="triangle2-active"></div>
                    <div className="step active-step">confirm Order</div>
                    <div className="triangle-active"></div>
                </Link> :
                <Link to="/Order/confirm">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Confirm Order</div>
                    <div className="triangle-incomplete"></div>
                </Link>
            }
            {payment ?
                <Link to="/payment">
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Payment</div>
                    <div className="triangle-active"></div>
                </Link> :
                <Link to="/payment">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Payment</div>
                    <div className="triangle-incomplete"></div>
                </Link>
            }

            {/* <div className="triangle2-active"></div>
            <div className="step active">Payment</div>
            <div className="triangle-active"></div>

            <div className="triangle2-incomplete"></div>
            <div className="step incomplete">Confirm Order</div>
            <div className="triangle-incomplete"></div> */}
        </div>

    )
}

export default CheckoutStrip