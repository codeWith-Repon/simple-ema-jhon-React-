import React from 'react'

const ReviewItem = ({product, handleRemoveProduct}) => {
    const {name, quantity, key, price} = product;

    const reviewItemStyle ={
        borderBottom: "1px solid lightgray",
        marginBottom: "5px",
        paddingBottom: "5px",
        marginLeft: "200px"
    }
  return (
    <div style={reviewItemStyle} className='review-item'>
      <h4 className='product-name'>{name}</h4>
      <p>Quantity: {quantity}</p>
      <p>$ {price}</p>
      <br />
      <button onClick={()=>handleRemoveProduct(key)} className='main-button'>Remove</button>
    </div>
  )
}

export default ReviewItem
