import React, { useEffect, useState } from "react";
import { getDatabaseCart } from "../../assets/utilities/databaseManager";
import fakeData from "../../assets/fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";

const Review = () => {
  const [cart, setCart] = useState([]);

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
    <div>
      <h1>this is review page cart items: {cart.length}</h1>
      {
        cart.map(pd=> <ReviewItem key={pd.key} product={pd}/>)
      } 
    </div>
  );
};

export default Review;
