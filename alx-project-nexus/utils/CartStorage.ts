export const CART_KEY = 'cartItems';
import { CartItem } from '@/interfaces';

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};
export const loadCart = () => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(CART_KEY);
  return saved ? JSON.parse(saved) : [];
};
