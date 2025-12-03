import React from 'react';
import Image from 'next/image';
import { ProductProp } from '@/interfaces';
import { routeToDest } from '@/utils/pageRoute';
import { PlusIcon, Star } from 'lucide-react';
import { capitalize } from '@/utils/cappitalize';
import { useCart } from '@/context/CartContext';

const ProductCard = ({
  id,
  product,
  price,
  category,
  rating,
  alt,
  image,
}: ProductProp) => {
  const { state, dispatch } = useCart();

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
    }
  };

  return (
    <div className="w-full h-full ">
      <div className="relative h-[50%]">
        <div className="flex justify-center items-center m-auto ">
          <Image
            src={image ? image : ''}
            width={180}
            height={180}
            alt={alt}
            className="object-contain h-[170px] object-center"
          />
        </div>
      </div>
      <div className={`flex flex-col gap-3.5 rounded-md p-5 bg-white`}>
        <div className="h-[100px]" onClick={routeToDest(`/products/${id}`)}>
          <p className="font-normal">{category}</p>
          <h4 className="font-bold h-[55px]">{capitalize(product)}</h4>
          <div>
            {[...Array(rating)].map((_, i) => {
              return (
                <span key={i} className="m-px">
                  ⭐
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold">{price}</p>
          <button
            onClick={handleToCart}
            className="bg-black rounded-full text-white"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
