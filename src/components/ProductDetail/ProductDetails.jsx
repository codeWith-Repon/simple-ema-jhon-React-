import React from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../assets/fakeData";
import Product from "../Product/Product";

const ProductDetails = () => {
    
    const {key} = useParams()
    const product = fakeData.find((pd)=>pd.key === key)
    console.log(product)
  return (
    <div>
      <h1>Product details</h1>
      <Product showAddToCart={false} product={product} />
    </div>
  );
};

export default ProductDetails;
