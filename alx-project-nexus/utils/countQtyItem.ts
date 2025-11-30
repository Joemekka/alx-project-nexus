import { CartItem } from '@/interfaces';
export const countQty = (items: CartItem[] = []) => {
  return items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
};
