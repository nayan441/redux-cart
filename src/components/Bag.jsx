import React from 'react'

const Bag = (props) => {
    const { quantity, cartItems } = useSelector((state) => state.cart)

  return (
    <>
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
  )
}

export default Bag