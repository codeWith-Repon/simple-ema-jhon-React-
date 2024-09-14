import React, { useEffect, useState } from "react";
import "./Shop.css";
import fakeData from "../../assets/fakeData";
import Product from "../Product/Product";
import Card from "../Card/Card";
import { addToDatabaseCart, getDatabaseCart } from "../../assets/utilities/databaseManager";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);

  const [cart, setCart] = useState([]);
   
  useEffect(()=>{
    const saveCart = getDatabaseCart();
    const productkeys = Object.keys(saveCart)
    const previousCard = productkeys.map((existingKey)=>{
      const product = fakeData.find(pd => pd.key === existingKey)
      product.quantity = saveCart[existingKey]
      return product
    })
    setCart(previousCard)
  },[]) 

  const handleAddProduct = (product) => {  
    const toBeAdedKey = product.key
    const smaeProduct = cart.find(pd => pd.key === toBeAdedKey)
    let count = 1;
    let newCart;
    if(smaeProduct){
      count = smaeProduct.quantity + 1;
      smaeProduct.quantity = count;
      const other = cart.filter(pd => pd.key !== product.key)
      newCart = [...other, smaeProduct]
    }
    else {
      product.quantity = 1
      newCart = [...cart,product]
    }
    setCart(newCart);
    
    addToDatabaseCart(product.key, count)
  };

  return (
    <div className="twin-container">
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
