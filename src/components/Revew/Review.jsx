import React, { useEffect, useState } from "react";
import { getDatabaseCart } from "../../assets/utilities/databaseManager";

const Review = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart)
    const coutns = productKeys.map((key)=> savedCart[key])
    console.log(coutns);
  }, []);

  return (
    <div>
      <h1>this is review page</h1>
    </div>
  );
};

export default Review;
