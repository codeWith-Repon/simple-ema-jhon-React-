import React from "react";
import './Card.css'

const Card = ({ cart, children }) => {
  // const total = cart.reduce((total,prd)=> total + prd.price, 0);
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price*product.quantity;
  }

  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 12.99;
  }

  const tax = (total / 10).toFixed(2);
  const grandTotal = (total + shipping + Number(tax)).toFixed(2);

  const formatNumber = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };

  return (
    <div>
      <h4 className="card-title">Order Summary</h4>
      <p>Items Ordered: {cart.length}</p>
      <p>Product Price: {formatNumber(total)}</p>
      <p>
        <small>Shipping Cost: {shipping} </small>
      </p>
      <p>
        <small>Tax + VAT: {tax}</small>
      </p>
      <p>total Price: {grandTotal}</p>
      <br />
        {
          children
        }
    </div>
  );
};

export default Card;
