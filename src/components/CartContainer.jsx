import React, { useEffect, useState } from 'react'
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux'
import { decrease, clearCart, increase, removeProduct, getCartItems } from '../features/cart/cartSlice';
import '../Style/CartContainer.css'
import axios from 'axios';

const API_URL = "http://localhost:3000/items"

const CartContainer = () => {
  const { quantity, cartItems, productList } = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  return (
    <>
      <section className='cart cart-left'>
        <header>
          <h2>Products</h2>
        </header>
        <div>
          <CartItem products={productList} />
        </div>
        <footer>
          <hr />
        </footer>
      </section>

      {
        (quantity < 1) ?
          <section className='cart cart-right'>
            <h2>Your bag</h2>
            <header>
              <h4 className='empty-cart'>is currently empty</h4>
            </header>
          </section> :
          <section className='cart cart-right'>
            <h2>Your bag</h2>
            {cartItems.map(product => (
              <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <div style={{ display: 'inline-block' }}>
                  <h3 style={{ margin: 0 }}>{product.title}</h3>
                  <p style={{ margin: '5px 0' }}>Price: ${product.price}</p>
                  <p style={{ margin: '5px 0' }}>Quantity: {product.quantity}</p>
                  <div style={{ display: "flex" }}>
                    <button style={{ margin: '5px 0' }} onClick={() => dispatch(decrease(product))}>-</button>
                    <p style={{ margin: '5px 0' , padding:'10px'}}>{product.quantity}</p>
                    <button style={{ margin: '5px 0' }}  onClick={() => dispatch(increase(product))}>+</button>
                  </div>

                  <button onClick={() => dispatch(removeProduct(product))}>Remove</button>
                </div>
              </div>
            ))}
            {cartItems.length >0 &&
            <button className='btn clear-btn' onClick={() => dispatch(clearCart())} >
              clear cart
            </button>
            }
          </section>

      }

    </>
  );
}

export default CartContainer