import { ReactNode } from 'react';

export interface LayoutProp {
  children: React.PropsWithChildren;
}
export interface ProductProp {
  id: number;
  product: string;
  price: number;
  rating: number;
  category: string[];
  description?: string;
  image?: string;
  alt: string;
  quantity?: number;
}
export interface ProductsItem {
  data: ProductProp[];
}
export interface CartItem extends ProductProp {
  quantity: number;
}
export interface CardProps {
  onClose?: () => void;
  isOpen?: boolean;
}
