import React from "react";
import "./Product.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Product = ({ product, handleAddProduct, showAddToCart }) => {
  // console.log(product)
  return (
    <div className="product">
      <div className="product-image">
        <img src={product.img} alt="" />
      </div>
      <div>
        <h4 className="product-name"><Link to={`/product/${product.key}`}>{product.name}</Link></h4>
        <p>
          <small> by: {product.seller}</small>
        </p>
        <p>${product.price}</p>
        <p>
          <small>only {product.stock} left in stock-order soon</small>
        </p>
        {showAddToCart ? <button className="main-button" onClick={handleAddProduct }>
          <FaShoppingCart />
          add to cart
        </button> : ""}
      </div>
    </div>
  );
};

export default Product;
