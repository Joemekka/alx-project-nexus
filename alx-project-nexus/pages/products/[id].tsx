import { ProductPageProps, ProductProp } from '../../interfaces';
import Nav from '@/components/layouts/Nav';
import Image from 'next/image';
import Quantity from '@/components/common/Quantity';
import { capitalize } from '@/utils/cappitalize';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import BuyNow from '@/components/common/BuyNow';

interface Params {
  params: { id: string };
}

export async function getStaticPaths() {
  try {
    const res = await fetch(
      'https://691136e07686c0e9c20cbfec.mockapi.io/products'
    );

    const products: ProductProp[] = await res.json();

    if (!products || products.length === 0) return <p>No Product Found</p>;

    const paths = products.map((p) => ({
      params: { id: p.id.toString() },
    }));

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.log(error, 'Failed To Load Item 🤬🤬');

    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }: Params) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/${params.id}`);

    // Stop everything if status is not OK
    if (!res.ok) {
      console.log('❌ Item fetch failed');
      return {
        props: { product: null },
        revalidate: 10,
      };
    }

    const product: ProductProp[] = await res.json();
    if (!product) return <p>No Product Found</p>;

    return { props: { product }, revalidate: 10 };
  } catch (error) {
    console.log(error, 'Failed To Load Item');

    return {
      props: { product: null },
      revalidate: 10,
    };
  }
}

export default function ProductPage({ product }: ProductPageProps) {
  const { state } = useCart();

  // Get quantity in cart
  const inCart = state.items.find((i) => i.id === product.id);
  const quantity = inCart?.quantity ?? 0;

  return (
    <main>
      <div className="bg-(--secondryColor)">
        <Nav />
      </div>
      <div className="flex h-[90vh] items-center w-[90%] m-auto max-md:flex-col max-md:pb-8">
        <div className="flex-1 flex ml-10 items-center">
          {product?.image && (
            <Image
              src={product.image}
              width={250}
              height={250}
              alt={product.product}
            />
          )}
        </div>
        <div className="flex flex-col justify-evenly flex-1 h-[60%] ">
          <span>{[capitalize(product?.category?.[0] ?? '')]}</span>
          <h1 className="text-black">{product?.product}</h1>
          <span className="font-bold text-(--secondryColor)">
            10/10・6 REVIEWS
          </span>
          <p className="text-black">{product?.Description}</p>
          <h4 className="font-bold text-black text-3xl">${product?.price}</h4>

          <div className="flex justify-between gap-5 w-[220px]">
            <div className="w-[150px]">
              <Quantity item={product} />
            </div>
            <div className="w-[150px] relative">
              <Link
                className="bg-black pt-0.5 absolute top-0 bottom-0 right-0 left-0 text-center text-white rounded-md"
                href="/checkout"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
