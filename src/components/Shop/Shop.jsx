import React, { useState } from "react";
import "./Shop.css";
import fakeData from "../../assets/fakeData";
import Product from "../Product/Product";
import Card from "../Card/Card";
import { addToDatabaseCart } from "../../assets/utilities/databaseManager";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);

  const [cart, setCart] = useState([]);

  const handleAddProduct = (product) => {
    console.log("produnct added", product);
    const newCart = [...cart, product];
    setCart(newCart);
    const smaeProduct = newCart.filter(pd => pd.key === product.key)
    const count = smaeProduct.length;
    addToDatabaseCart(product.key, count)
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            showAddToCart={true}
            key={product.key}
            product={product}
            handleAddProduct={() => handleAddProduct(product)}
          />
        ))}
      </div>
      <div className="cart-container">
       <Card cart={cart}/>
      </div>
    </div>
  );
};

export default Shop;
