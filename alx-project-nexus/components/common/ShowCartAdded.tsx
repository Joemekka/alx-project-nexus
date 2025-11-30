import { useEffect, useState } from 'react';
import { countQty } from '@/utils/countQtyItem';
import { useCart } from '@/context/CartContext';

const ShowCartAdded = () => {
  const { state } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (state.items.length > 0) {
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.items]);

  if (!show) return null;

  return (
    <div className="bg-black flex justify-center w-full text-white py-1.5">
      <div className="w-[90%] text-center">
        {countQty(state.items)} Item Added To Cart
      </div>
      <button onClick={() => setShow(false)}>X</button>
    </div>
  );
};

export default ShowCartAdded;
