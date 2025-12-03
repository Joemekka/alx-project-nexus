import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, ShoppingBag } from 'lucide-react';
import Logo from './Logo';
import Cart from './Cart';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Close } from '@mui/icons-material';

const Nav = () => {
  const { state } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  const totalQty = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex relative justify-between overflow-hidden  w-[90%] m-auto items-center py-3">
      <Logo color="#fff" />
      <ul className="flex items-center gap-10 max-md:hidden ">
        <Link className="text-white" href="/">
          Home
        </Link>
        <Link className="text-white" href="/products">
          Shop
        </Link>
        <Link className="text-white" href="/about">
          About Us
        </Link>
        <Link className="text-white" href="/contact">
          Contact Us
        </Link>
      </ul>
      <div className="flex items-center gap-2.5">
        <button onClick={() => setShowCart(true)} className="flex -mr-3">
          <ShoppingBag className="text-white " />
          <div className="relative right-3 top-px">
            <Image
              src="/icons/Ellipse1.svg"
              width={15}
              height={15}
              alt="cart"
            />

            <span className="absolute left-0.5 text-white font-bold  bottom-px">
              {mounted ? totalQty : 0}
            </span>
          </div>
        </button>
        {showCart && (
          <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
        )}

        <Menu
          className="hidden max-md:block text-white "
          onClick={handleMenu}
        />
        {menu && (
          <ul className="md:hidden max-md:flex bg-black h-full w-full flex-col items-center fixed top-0 left-0  right-0 z-10 gap-10">
            <div className="flex justify-end items-center w-full ">
              <button onClick={() => setMenu(false)}>
                <Close className="text-white" />
              </button>
            </div>
            <Link className="text-white" href="/">
              Home
            </Link>
            <Link className="text-white" href="/products">
              Shop
            </Link>
            <Link className="text-white" href="/about">
              About Us
            </Link>
            <Link className="text-white" href="/contact">
              Contact Us
            </Link>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;
