import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = "http://localhost:3000/items"

export const getCartItems = createAsyncThunk('cart/getCartItems',async (name, thunkAPI) => {
  try {
    console.log("thunkAPI.getState");
    console.log(thunkAPI.getState());
    // thunkAPI.dispatch(openModal());
    const resp = await axios(API_URL);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
})

const initialState = {
  productList:[],
  cartItems: [],
  quantity: 0,
  total: 0,
  isLoading: false,
  status:"idel"
};
 const cartSlice = createSlice({
  name:"cart",
  initialState,
  reducers:{
    increase:(state, {payload}) =>{  
      let cartItemsIndex = state.cartItems.findIndex((item)=>item.id===payload.id)
      if(cartItemsIndex!=-1){
        state.cartItems[cartItemsIndex].quantity +=1
        state.quantity += 1    
        state.total += Number(payload.price)    
      }else{
        state.cartItems.push(payload)
        state.quantity += 1    
        state.total += Number(payload.price) 
      }
    },
    decrease:(state,{payload})=>{
      let cartItemsIndex = state.cartItems.findIndex((item)=>item.id===payload.id)
      if(state.cartItems[cartItemsIndex].quantity > 1){
        state.cartItems[cartItemsIndex].quantity -=1
        state.quantity -= 1    
        state.total -= Number(payload.price)    
      }else{
        state.quantity -= 1  
        state.total -= Number(payload.price) 
        state.cartItems= state.cartItems.filter(x=>x.id != payload.id)
      }
    },
    clearCart:(state)=>{
      state.quantity =0
      state.total = 0
      state.cartItems=[]
    },
    removeProduct:(state,{payload})=>{
      
      state.quantity -= payload.quantity 
      state.total -= Number(payload.quantity) * Number(payload.price) 
      state.cartItems= state.cartItems.filter((item)=>item.id!=payload.id)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        console.log("getCartItems.pending");
        state.status = "Pending";
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.status = "Success";
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log("getCartItems.Failed");
        state.status = "Failed";
        state.isLoading = false;
      });
  },
} )

export const { increase, decrease, calculateTotals, clearCart,removeProduct } = cartSlice.actions;

export default cartSlice.reducer;