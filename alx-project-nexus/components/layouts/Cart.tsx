import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import DeleteIcon from '@/public/icons/delete.svg';
import { CardProps } from '@/interfaces';
import { formatCurrency } from '@/utils/formatCurrency';

const Cart = ({ onClose, isOpen }: CardProps) => {
  const { state, dispatch } = useCart();
  const total = state.items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );
  return (
    <div
      className={`
        fixed overflow-y-auto top-0 right-0 flex flex-col justify-between gap-5
        h-[450px] w-[400px] bg-[#F7F7F7] shadow-xl z-9999
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="flex  justify-end mr-4">
        <button className="" onClick={onClose}>
          X
        </button>
      </div>
      <div className="flex justify-between items-center px-2">
        <h4>Total Item In Cart {state.items.length}</h4>
        <h4>{formatCurrency(total)}</h4>
      </div>
      <div className="h-full flex flex-col gap-2.5">
        {state.items.map((item, i) => (
          <div className="bg-white  flex gap-5 items-center" key={i}>
            <Image
              src="/assets/mediamodifier_image.png"
              width={120}
              height={120}
              alt="Iphone"
            />
            <div className="flex w-[60%] justify-between items-center">
              <div className="px-2.5">
                <h4>{item.product}</h4>
                <h4>${item.price}</h4>
              </div>
              <div className="flex w-[40%] h-full flex-col justify-between  ">
                <div className="flex  h-full mb-2">
                  <div className="flex shadow item-center w-full h-[30px] overflow-hidden rounded-md">
                    <button
                      className="bg-black  text-white flex-1"
                      onClick={() =>
                        dispatch({ type: 'DECREASE_QTY', payload: item.id })
                      }
                    >
                      -
                    </button>
                    <span className="flex-1 font-bold text-center pt-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({ type: 'INCREASE_QTY', payload: item.id })
                      }
                      className="flex-1 bg-black  text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="h-full">
                  <button
                    onClick={() =>
                      dispatch({ type: 'REMOVE_ITEM', payload: item.id })
                    }
                  >
                    <div className="flex now-wrap items-center gap-1 text-black">
                      <span className="">x</span>

                      <span className="text-[12px]">Remove Item</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="bg-(--secondryColor) py-2.5">
        Proceed To Checkout
      </button>
    </div>
  );
};
export default Cart;
