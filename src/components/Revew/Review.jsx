import React, { useEffect, useState } from "react";
import { clearLocalShoppingCart, getDatabaseCart, removeFromDatabaseCart } from "../../assets/utilities/databaseManager";
import fakeData from "../../assets/fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Card from "../Card/Card";
import happyImage from '../../assets/images/giphy.gif'

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePlaceOrder = () => {
    setCart([]);
    setOrderPlaced(true)
    clearLocalShoppingCart()
  }

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

    let thankYou;
    if(orderPlaced){
      thankYou = <img src={happyImage} />
    }
  return (
    <div className="twin-container">
     <div className="product-container">
     {
        cart.map(pd=> <ReviewItem handleRemoveProduct={handleRemoveProduct} key={pd.key} product={pd}/>)
      } 
      {
        thankYou
      }
     </div> 
     <div className="cart-container">
        <Card cart={cart}>
          <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
        </Card> 
        
     </div>
    </div>
  );
};

export default Review;
