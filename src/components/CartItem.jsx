import React from 'react'
import { useDispatch } from 'react-redux'
import { decrease, increase } from '../features/cart/cartSlice'

const CartItem = (props) => {
  const {products}=props
  const dispatch =useDispatch()

  return (          
    <div>
      {products.map(product => (
        <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <img src={product.img} alt={product.title} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
          <div style={{ display: 'inline-block' }}>
            <h3 style={{ margin: 0 }}>{product.title}</h3>
            <p style={{ margin: '5px 0' }}>Price: ${product.price}{product.quantity}</p>
            <button onClick={() => dispatch(increase(product))}>Add</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartItem