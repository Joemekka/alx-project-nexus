import { useCart } from '@/context/CartContext';
import { ProductProp } from '@/interfaces';

interface QuantityProps {
  item: ProductProp;
}

export default function Quantity({ item }: QuantityProps) {
  const { state, dispatch } = useCart();

  // Check if the item is already in cart
  const inCart = state.items.find((i) => i.id === item.id);
  const quantity = inCart?.quantity ?? 0;

  const handleIncrease = () => {
    if (inCart) {
      dispatch({ type: 'INCREASE_QTY', payload: item.id });
    } else {
      dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 } });
    }
  };

  const handleDecrease = () => {
    if (!inCart) return;
    dispatch({ type: 'DECREASE_QTY', payload: item.id });
  };

  return (
    <div className="flex w-full">
      <div className="flex shadow items-center w-full h-[30px] rounded-md overflow-hidden">
        <button
          className="bg-black text-white flex-1 h-full"
          onClick={handleDecrease}
          disabled={quantity === 0}
        >
          -
        </button>

        <span className="flex-1 text-center font-bold">{quantity}</span>

        <button
          className="bg-black text-white flex-1 h-full"
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
}
