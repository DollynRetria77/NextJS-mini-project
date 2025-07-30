'use client';
import { createSlice } from "@reduxjs/toolkit";

let carts;

if (typeof window !== 'undefined') {
    const storedCarts = localStorage.getItem('carts');
    if (storedCarts !== null && typeof storedCarts !== 'undefined') {
      try {
        carts = JSON.parse(storedCarts);
      } catch (error) {
        console.error('Failed to parse stored carts:', error);
        carts = [];
      }
    } else {
      carts = [];
    }
}

const initialState = {
    product: carts
}

export const panierSlice = createSlice({
    name: "panier",
    initialState, 
    reducers: {
        addCartItem: (state, action) => {
            const cartItems = [...state.product, action.payload];
            localStorage.setItem('carts', JSON.stringify(cartItems));
            state.product = cartItems;
        },
        deleteCartItem: (state, action) => {
            const filterById = state.product.filter(productItem => {
                return productItem.id !== action.payload;
            })
            localStorage.setItem('carts', JSON.stringify(filterById))
            state.product = filterById;
        },
        deleteAllItem: (state) => {
            localStorage.removeItem('carts');
            state.product = [];
        },
        updatedCartItems: (state, action) => {
            const updated = state.product.map(item => {
                if(item.id === action.payload.id){
                    return {
                        ...item, 
                        quantity: action.payload.quantity
                    }
                }
                return item;
            });
            localStorage.setItem('carts', JSON.stringify(updated));
            state.product = updated;
        }
    }
})

export const {
    addCartItem, 
    deleteCartItem, 
    deleteAllItem, 
    updatedCartItems
} = panierSlice.actions;

export default panierSlice.reducer;