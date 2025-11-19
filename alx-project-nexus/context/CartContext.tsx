import { createContext, useReducer, useContext, ReactNode } from 'react';
import { ProductProp } from '@/interfaces';
import { CartItem } from '@/interfaces';

type CartState = {
  items: CartItem[];
};
type CartAction =
  | { type: 'ADD_ITEM'; payload: ProductProp }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'INCREASE_QTY'; payload: number }
  | { type: 'DECREASE_QTY'; payload: number };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({ state: { items: [] }, dispatch: () => null });

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exsiting = state.items.find((i) => i.id === action.payload.id);
      if (exsiting) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    }
    case 'INCREASE_QTY': {
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    case 'DECREASE_QTY': {
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload
            ? { ...i, quantity: Math.max(i.quantity - 1, 1) }
            : i
        ),
      };
    }
    default:
      return state;
  }
};
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
