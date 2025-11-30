import React from 'react';
import Image from 'next/image';
import { ProductProp } from '@/interfaces';
import { useRouter } from 'next/router';
import { PlusIcon, Star } from 'lucide-react';
import { capitalize } from '@/utils/cappitalize';
import { useCart } from '@/context/CartContext';

const BuyNow = ({ id, product, price, category, rating, alt }: ProductProp) => {
  const { state, dispatch } = useCart();

  const routeToCheckout = () => {
    const route = useRouter();

    const gotoRoute = () => {
      route.push('/checkout');
    };
    return gotoRoute;
  };

  const handleToCart = () => {
    const existing = state.items.find((i) => i.id === id);

    if (existing) {
      // Already in cart → increase quantity
      dispatch({ type: 'INCREASE_QTY', payload: id });
    } else {
      // Not in cart → add new item
      dispatch({
        type: 'ADD_ITEM',
        payload: { id, product, price, category, rating, alt, quantity: 1 },
      });
      routeToCheckout();
    }
  };

  return (
    <button
      onClick={handleToCart}
      className="bg-black rounded-md h-full w-full text-center text-white"
    >
      Buy Now
    </button>
  );
};

export default BuyNow;
