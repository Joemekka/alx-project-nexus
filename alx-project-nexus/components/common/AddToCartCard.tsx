import React from 'react';
import Image from 'next/image';
import { ProductProp } from '@/interfaces';

import { PlusIcon, Star } from 'lucide-react';
import { capitalize } from '@/utils/cappitalize';
import { useCart } from '@/context/CartContext';

const AddToCartCard = ({
  id,
  product,
  price,
  category,
  rating,
  alt,
}: ProductProp) => {
  const { dispatch } = useCart();

  const handleToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { id, product, price, category, rating, alt },
    });
  };

  return (
    <div className="w-1/4 h-[350px]">
      <Image src="/assets/chair1.png" width={120} height={120} alt={alt} />
      <div
        className={`flex flex-col gap-3.5 rounded-md h-[204px] p-5 bg-white`}
      >
        <div className="h-[100px]">
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
          <p className="font-bold">${price}</p>
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

export default AddToCartCard;
