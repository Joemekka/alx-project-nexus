import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import DeleteIcon from '@/public/icons/delete.svg';
import { CardProps } from '@/interfaces';
import { formatCurrency } from '@/utils/formatCurrency';
import { accumulateQty } from '@/utils/accumulateQty';
import Link from 'next/link';
import Quantity from '../common/Quantity';

const Cart = ({ onClose, isOpen }: CardProps) => {
  const { state, dispatch } = useCart();

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
        <button className="" onClick={() => onClose?.()}>
          X
        </button>
      </div>
      <div className="flex justify-between items-center px-2">
        <h4>Total Item In Cart {state.items.length}</h4>
        <h4>{accumulateQty(state.items)}</h4>{' '}
        {/* <-- pass CartState, not CartItem[] */}
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
                <h4 className="font-bold">${item.price}</h4>
              </div>
              <div className="flex w-[40%] h-full flex-col justify-between  ">
                <div className=" w-full">
                  <Quantity key={item.id} item={item} />
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
      <Link
        href="/checkout"
        className="bg-(--secondryColor) text-center  py-2.5"
      >
        Proceed To Checkout
      </Link>
    </div>
  );
};

export default Cart;
