import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { ProductProp, CartItem } from '@/interfaces';
import { saveCart, loadCart } from '@/utils/CartStorage';

export type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: ProductProp }
  | { type: 'REMOVE_ITEM'; payload: string } // <- change from number to string
  | { type: 'INCREASE_QTY'; payload: string } // <- change from number to string
  | { type: 'DECREASE_QTY'; payload: string } // <- change from number to string
  | { type: 'SET_CART'; payload: CartItem[] };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({ state: { items: [] }, dispatch: () => null });

// Pure reducer (no hooks here!)
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload), // <- now i.id (string) === payload (string)
      };
    case 'INCREASE_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case 'DECREASE_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload
            ? { ...i, quantity: Math.max(i.quantity - 1, 1) }
            : i
        ),
      };
    case 'SET_CART':
      return { items: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const storedCart = loadCart();
    if (storedCart) {
      dispatch({ type: 'SET_CART', payload: storedCart });
    }
  }, []);

  useEffect(() => {
    saveCart(state.items);
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
