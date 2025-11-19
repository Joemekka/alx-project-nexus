import Header from '@/components/layouts/Header';
import Nav from '@/components/layouts/Nav';
import { LucideArrowRight, Search } from 'lucide-react';
import AddToCartCard from '@/components/common/AddToCartCard';
import Link from 'next/link';
import ArrowRigth from '@/public/icons/arrow_right.svg';
import { capitalize } from '@/utils/cappitalize';
import { ProductProp, ProductsItem } from '@/interfaces';
import { GetStaticProps } from 'next';
import Cart from '@/components/layouts/Cart';

export const getStaticProps: GetStaticProps<ProductsItem> = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}`);
  const data: ProductProp[] = await res.json();
  console.log('data', data);

  return {
    props: { data },
    revalidate: 60,
  };
};

const Home: React.FC<ProductsItem> = ({ data }) => {
  return (
    <main>
      {/* Header */}
      <Header>
        <Nav />
        <div className="flex flex-col gap-3.5 h-[350px] w-[800px] text-white capitalize text-base/snug  text-center m-auto justify-center  items-center">
          <h1 className="font-bold">
            Make your interior more minimalistic & modern
          </h1>
          <p className="w-[400px]">
            Turn your room with panto into a lot more minimalist and modern with
            ease and speed
          </p>
          <form className="flex items-center backdrop-filter bg-[#4a4b4dae]  backdrop-blur-sm border border-white/45 rounded-full py-[0.2rem] overflow-hidden">
            <input
              className="flex-1 indent-5 bg-grey  placeholder:text-sm focus:outline-0 "
              placeholder="Search furniture"
            />

            <Search
              className={`text-(--primaryColor) border bg-(--secondryColor) rounded-full p-1 mr-0.5`}
            />
          </form>
        </div>

        <input type="search" className="w-1/4 " />
      </Header>
      {/* Why Choose Us */}
      <div className="flex justify-between h-screen items-center gap-2.5 w-[90%] m-auto">
        <div className="w-3/4 mr-10">
          <h2>Why Choose Us</h2>
        </div>
        <div>
          <h4 className="text-(--secondryColor)">Luxiry facilities</h4>
          <p>
            The advantage of hiring a workspace with us is that givees you
            comfortable service and all-around facilities.
          </p>
          <Link href="/" className="text-(--secondryColor)">
            More Info
          </Link>
        </div>
        <div>
          <h4 className="text-(--secondryColor)">Luxiry facilities</h4>
          <p>
            The advantage of hiring a workspace with us is that givees you
            comfortable service and all-around facilities.
          </p>
          <Link href="/" className="text-(--secondryColor)">
            <div className="flex">
              <ArrowRigth className="text-red-600" />
            </div>
          </Link>
        </div>
        <div>
          <h4 className="text-(--secondryColor)">Luxiry facilities</h4>
          <p>
            The advantage of hiring a workspace with us is that givees you
            comfortable service and all-around facilities.
          </p>
          <Link href="/" title="More Info" className="text-(--secondryColor)">
            <span>More Info</span>
          </Link>
        </div>
      </div>
      {/* Product slider */}
      <div className="h-screen bg-[#F7F7F7] ">
        <div className="h-screen bg-[#F7F7F7] flex flex-col items-center justify-center">
          <div className="relative w-[90%]">
            {/* Slider Buttons */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
              onClick={() => {
                const container = document.getElementById('slider-container');
                container?.scrollBy({ left: -300, behavior: 'smooth' });
              }}
            >
              &#8592; {/* left arrow */}
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
              onClick={() => {
                const container = document.getElementById('slider-container');
                container?.scrollBy({ left: 300, behavior: 'smooth' });
              }}
            >
              &#8594; {/* right arrow */}
            </button>

            {/* Slider Container */}
            <div
              id="slider-container"
              className="flex overflow-x-auto scroll-smooth gap-5 py-5 scrollbar-none"
            >
              {data?.map((card) => (
                <AddToCartCard
                  key={card.id}
                  id={card.id}
                  product={capitalize(card.product)}
                  price={card.price}
                  rating={card.rating}
                  category={[capitalize(card.category?.[0] ?? '')]}
                  alt={card.product}
                />
              ))}
            </div>
            <Cart />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
