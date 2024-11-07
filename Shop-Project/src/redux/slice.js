// src/features/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateCart: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.qty = qty;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    decrementCart: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          // Si la cantidad llega a 0, elimina el item del carrito
          state.items = state.items.filter(i => i.id !== id);
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  },
});

export const { addToCart, removeFromCart, updateCart, decrementCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;