import React, { useEffect, useState } from "react";
import { getDatabaseCart, removeFromDatabaseCart } from "../../assets/utilities/databaseManager";
import fakeData from "../../assets/fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Card from "../Card/Card";

const Review = () => {
  const [cart, setCart] = useState([]);

  const handleRemoveProduct = productKey => {
      const newCart = cart.filter(product=> product.key !== productKey)
      setCart(newCart)
      removeFromDatabaseCart(productKey)
  }


  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart)
    // console.log(productKeys)

    const cartProducts = productKeys.map((key)=> {
      const product = fakeData.find(pd => pd.key === key)
      product.quantity = savedCart[key]
      console.log(product)
      return product;
    })
    setCart(cartProducts)
  }, []);

  return (
    <div className="twin-container">
     <div className="product-container">
     {
        cart.map(pd=> <ReviewItem handleRemoveProduct={handleRemoveProduct} key={pd.key} product={pd}/>)
      } 
     </div>
     <div className="cart-container">
        <Card cart={cart}/> 
     </div>
    </div>
  );
};

export default Review;
