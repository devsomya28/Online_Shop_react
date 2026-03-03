import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.find(item => item.id === action.product.id);
      if (existing) {
        return state.map(item =>
          item.id === action.product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...state, { ...action.product, qty: 1 }];
    }
    case "UPDATE_QUANTITY": {
      const newQty = parseInt(action.qty);
      if (isNaN(newQty) || newQty < 1) return state;
      return state.map(item =>
        item.id === action.id ? { ...item, qty: newQty } : item
      );
    }
    case "REMOVE":
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}