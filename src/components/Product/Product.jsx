import React from "react";
import "./Product.css";
import { FaShoppingCart } from "react-icons/fa";

const Product = ({ product, handleAddProduct }) => {
  return (
    <div className="product">
      <div className="product-image">
        <img src={product.img} alt="" />
      </div>
      <div>
        <h4 className="product-name">{product.name}</h4>
        <p>
          <small> by: {product.seller}</small>
        </p>
        <p>${product.price}</p>
        <p>
          <small>only {product.stock} left in stock-order soon</small>
        </p>
        <button className="main-button" onClick={handleAddProduct }>
          <FaShoppingCart />
          add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
