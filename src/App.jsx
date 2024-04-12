import React, { useEffect } from 'react'
import NavBar from './components//Navbar'
import CartContainer from './components/CartContainer'
import {useSelector, useDispatch} from 'react-redux'
import { getCartItems } from './features/cart/cartSlice'
const App = () => {
  const {isLoading, status } = useSelector(state=>state.cart)
  console.log("isLoading", isLoading);
  console.log("status", status);
  const dispatch = useDispatch()
  useEffect(()=>{    dispatch(getCartItems('random'));
},[])
  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <>
    <NavBar/>
    <CartContainer/>
    </>
  )
}

export default App