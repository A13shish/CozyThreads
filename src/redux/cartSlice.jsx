import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const existingItem = state.find(item => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        deleteFromCart(state, action) {
            return state.filter(item => !(item.id === action.payload.id && item.selectedSize === action.payload.selectedSize));
        },
        clearCart() {
            localStorage.removeItem('cart');
            return [];
        },
        increaseQuantity(state, action) {
            const item = state.find(item => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize);
            if (item) {
                item.quantity += 1;
                localStorage.setItem('cart', JSON.stringify(state)); // ✅ Update localStorage
            }
        },
        decreaseQuantity(state, action) {
            const itemIndex = state.findIndex(item => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize);
            if (itemIndex !== -1) {
                if (state[itemIndex].quantity > 1) {
                    state[itemIndex].quantity -= 1;
                } else {
                    state.splice(itemIndex, 1); // ✅ Remove item if quantity is 1
                }
                localStorage.setItem('cart', JSON.stringify(state)); // ✅ Update localStorage
            }
        }
    }
});

export const { addToCart, deleteFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
