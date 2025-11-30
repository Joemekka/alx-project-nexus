import { ReactNode } from 'react';

export interface LayoutProp {
  children: React.PropsWithChildren;
}
export interface LogosProp {
  color: string;
}
export interface ProductProp {
  id: string;
  product: string;
  price: number;
  rating: number;
  category: string[];
  Description?: string;
  image?: string;
  alt: string;
  quantity?: number;
}
export interface ProductAllProp {
  products: ProductProp[];
}
export interface ProductPageProps {
  product: CartItem;
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
export interface ShippingProps {
  shipping: {
    fullName: string;
    email: string;
    phoneNumber: '';
    address: string;
    country: string;
  };
  billing: {
    cardName: '';
    cardNumber: string;
    cardExpiry: string;
    cardCVV: string;
    useShipping: boolean;
  };
  billingShipping: {
    phoneNumber: string;
    address: string;
    country: string;
  };
  status: string;
  paymentMethod: string;
}
