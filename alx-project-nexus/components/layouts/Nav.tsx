import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import Logo from './Logo';
import Cart from './Cart';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const Nav = () => {
  const [showCart, setShowCart] = useState(false);
  const { state } = useCart();
  const totalQty = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartButton = () => {
    setShowCart(true);
  };
  return (
    <nav className="flex relative justify-between overflow-hidden  w-[90%] m-auto items-center py-3">
      <Logo />
      <ul className="flex items-center gap-10">
        <Link className="text-white" href="/">
          {' '}
          Home
        </Link>
        <Link className="text-white" href="/shop">
          Shop
        </Link>
        <Link className="text-white" href="/about">
          About Us
        </Link>
        <Link className="text-white" href="/contact">
          Contact Us
        </Link>
      </ul>
      <button onClick={() => setShowCart(true)} className="flex -mr-3">
        <ShoppingBag className="text-white " />
        <div className="relative right-3 top-px">
          <Image src="/icons/Ellipse1.svg" width={15} height={15} alt="cart" />

          <span className="absolute left-0.5 text-white font-bold  bottom-px">
            {totalQty}
          </span>
        </div>
      </button>
      {showCart && (
        <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      )}
    </nav>
  );
};

export default Nav;
