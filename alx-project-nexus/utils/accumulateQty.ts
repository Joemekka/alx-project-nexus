import { formatCurrency } from './formatCurrency';
import { CartItem } from '@/interfaces';

export const accumulateQty = (items: CartItem[] = []): string => {
  const total = items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );
  return formatCurrency(total);
};
