import Header from '@/components/layouts/Header';
import Nav from '@/components/layouts/Nav';
import { useSearch } from '@/hooks/useSearch';
import Image from 'next/image';
import { Search as SearchIcon } from 'lucide-react';
import ProductCard from '@/components/common/productCard';
import Link from 'next/link';
import ArrowRigth from '@/public/icons/arrow_right.svg';
import { formatCurrency } from '@/utils/formatCurrency';
import { ProductProp, ProductsItem } from '@/interfaces';
import { GetStaticProps } from 'next';
import ShowCartAdded from '@/components/common/ShowCartAdded';
import dynamic from 'next/dynamic';
const Cart = dynamic(() => import('@/components/layouts/Cart'), { ssr: false });
import { useEffect, useState, useRef } from 'react';
import { ArrowRightAltSharp } from '@mui/icons-material';
import { routeToDest } from '@/utils/pageRoute';

export const getStaticProps: GetStaticProps<ProductsItem> = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}`);
    const data: ProductProp[] = await res.json();

    return {
      props: { data },
    };
  } catch (error) {
    console.log('Failed To Fetch Products');

    return {
      props: { data: [] },
    };
  }
};

const Home: React.FC<ProductsItem> = ({ data }) => {
  const { query, setQuery, filterData } = useSearch(data, 'product');

  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Duplicate items for infinite loop
  const items = [...data, ...data];

  useEffect(() => {
    const container = containerRef.current;
    let scrollAmount = 0;

    const tick = () => {
      if (!container || paused) return;

      container.scrollLeft += 1;
      scrollAmount += 1;

      // Reset once we've scrolled through one full set
      if (scrollAmount >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
        scrollAmount = 0;
      }
    };

    const interval = setInterval(tick, 10); // speed of auto-scroll

    return () => clearInterval(interval);
  }, [paused]);

  // Manual navigation
  const slideLeft = () => {
    const container = containerRef.current;
    container?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const slideRight = () => {
    const container = containerRef.current;
    container?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <main className="mb-24 overflow-x-hidden">
      {/* Header */}
      <Header>
        <Nav />
        <div className="max-md:h-full flex flex-col gap-3.5 h-[350px] w-[800px] text-white capitalize text-base/snug  text-center m-auto justify-center  items-center">
          <h1 className="font-bold max-md:wrap-normal">
            Make your interior more minimalistic & modern
          </h1>
          <p className="w-[400px] max-md:w-[350px] font-bold">
            Turn your room with panto into a lot more minimalist and modern with
            ease and speed
          </p>
          <div>
            <form className="flex items-center backdrop-filter bg-[#4a4b4dae]  backdrop-blur-sm border border-white/45 rounded-full py-[0.2rem] overflow-hidden">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 indent-5! bg-grey  placeholder:text-sm focus:outline-0 "
                placeholder="Search furniture"
              />

              <SearchIcon
                className={`text-(--primaryColor) border bg-(--secondryColor) rounded-full p-1 mr-0.5`}
              />
            </form>
            {query && (
              <ul className="fixed top-84 left-130  backdrop-filter mt-1.5 bg-[#4a4b4dae]  backdrop-blur-sm border border-white/45 rounded-md flex flex-col items-start p-5">
                {filterData.length > 0 ? (
                  filterData.map((product) => (
                    <li
                      className="hover:text-(--secondryColor) cursor-pointer"
                      key={product.id}
                      onClick={routeToDest(`/products/${product.id}`)}
                    >
                      {product.product}
                    </li>
                  ))
                ) : (
                  <div className=" w-full">
                    <li className="text-center w-full">No Result Found</li>
                  </div>
                )}
              </ul>
            )}
          </div>
        </div>

        <input type="search" className="w-1/4 " />
      </Header>
      {/* Feature Product */}
      <div className="flex justify-between gap-3.5 m-auto w-[90%] mt-6 mb-6 max-md:flex-col">
        <div className="flex items-center gap-2 p-5 shadow rounded-sm bg-[#F7F7F7] justify-between flex-1">
          <div className="flex flex-col gap-2">
            <h4 className="text-2xl">Long Sofa</h4>
            <p>Structuring almoxt highlights</p>
            <Link
              href="/products"
              className="underline text-(--secondryColor) text-shadow-md hover:text-shadow-md hover:text-black hover:transition-shadow"
            >
              Shop Now
            </Link>
          </div>
          <Image
            src="/assets/chair1.png"
            width={150}
            height={150}
            alt="Long Sofa"
          />
        </div>
        <div className="flex flex-1 items-center shadow rounded-sm gap-2 p-5 bg-[#e5861181] justify-between">
          <div className="flex flex-col gap-2 ">
            <h4 className="text-2xl">Dining Chair</h4>
            <p>Structuring almoxt highlights</p>
            <Link
              href="/products"
              className="underline text-black text-shadow-md hover:text-shadow-md hover:text-(--secondryColor) hover:transition-shadow"
            >
              Shop Now
            </Link>
          </div>
          <Image
            src="/assets/chair2.png"
            width={140}
            height={140}
            alt="Long Sofa"
          />
        </div>
      </div>
      {/* Why Choose Us */}
      <div className="flex max-md:flex-col max-md:h-screen justify-between py-10 items-center gap-2.5 w-[90%] m-auto">
        <div className="w-3/4 mr-10">
          <h2 className="max-md:text-center">Why Choose Us</h2>
        </div>
        <div className="flex flex-col gap-1.5 max-md:bg-[#F7F7F7] max-md:p-5 max-md:shadow max-md:rounded-md">
          <h4 className="text-(--secondryColor) text-2xl font-bold">
            Luxiry facilities
          </h4>
          <p>
            The advantage of hiring a workspace with us is that givees you
            comfortable service and all-around facilities.
          </p>
          <Link href="/products" className="text-(--secondryColor)">
            <div className="flex cursor-pointer">
              <span className="font-bold">More Info</span>
              <ArrowRightAltSharp />
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-1.5 max-md:bg-[#F7F7F7] max-md:p-5 max-md:shadow max-md:rounded-md">
          <h4 className="text-(--secondryColor) text-2xl font-bold">
            Luxiry facilities
          </h4>
          <p>
            The advantage of hiring a workspace with us is that givees you
            comfortable service and all-around facilities.
          </p>
          <Link href="/products" className="text-(--secondryColor)">
            <div className="flex cursor-pointer">
              <span className="font-bold">More Info</span>
              <ArrowRightAltSharp />
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-1.5 max-md:bg-[#F7F7F7] max-md:p-5 max-md:shadow max-md:rounded-md">
          <h4 className="text-(--secondryColor) text-2xl font-bold">
            Luxiry facilities
          </h4>
          <p>
            The advantage of hiring a workspace with us is that givees you
            comfortable service and all-around facilities.
          </p>
          <Link href="/products" className="text-(--secondryColor)">
            <div className="flex cursor-pointer">
              <span className="font-bold">More Info</span>
              <ArrowRightAltSharp />
            </div>
          </Link>
        </div>
      </div>
      {/* Slider */}
      <div className="h-fit bg-[#F7F7F7] flex flex-col items-center justify-center py-10">
        <h2>Trending Products</h2>
        <p>Our best selling products of all time</p>
        <div
          className="relative w-[90%] h-full flex flex-col justify-center "
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={slideLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow z-10 hover:scale-110 transition"
          >
            &#8592;
          </button>

          <button
            onClick={slideRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow z-10 hover:scale-110 transition"
          >
            &#8594;
          </button>

          {/* Slider container */}
          <div
            ref={containerRef}
            className="flex gap-5 h-[80%] overflow-hidden"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {items.map((card, i) => (
              <div
                key={i}
                className="flex-[0_0_25%] max-md:flex-[0_0_50%]"
                style={{
                  scrollSnapAlign: 'start',
                  opacity: 0,
                  animation: 'fadeIn 0.8s ease forwards',
                  animationDelay: `${(i % data.length) * 0.15}s`,
                }}
              >
                <ProductCard
                  image={card.image}
                  id={card.id}
                  product={card.product}
                  price={formatCurrency(card.price as number)}
                  rating={card.rating}
                  category={[card.category?.[0] ?? '']}
                  alt={card.product}
                />
              </div>
            ))}
          </div>

          {/* Fade-in keyframes */}
          <style>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        </div>
      </div>
      <div className="flex flex-col gap-9 items-center w-[90%] mt-7 mb-7 m-auto h-[520px] max-md:h-fit ">
        <div className="flex  w-full flex-between gap-2 ">
          <div className="flex-[0.5] max-md:flex-0 max-md:w-[20%]">
            <h2 className="max-md:text-2xl! max-md:font-bold">Category</h2>
          </div>
          <div className="flex justify-end gap-5 items-center flex-1 max-md:ml-12 max-md:overflow-x-scroll scroll-smooth max-md:flex-nowrap">
            <button className="max-md:text-sm text-nowrap">
              Comfort Chair
            </button>
            <button className="max-md:text-sm text-nowrap">Soft Chair</button>
            <button className="max-md:text-sm text-nowrap">Ledder Chair</button>
            <button className="max-md:text-sm text-nowrap">Wooden Chair</button>
          </div>
        </div>
        <div className="flex items-start gap-5 w-full h-full max-md:flex-col">
          <div className="bg-[#F7F7F7] rounded-d shadow relative flex justify-center items-center  w-[40%] h-full max-md:w-full">
            <Image
              src="/assets/chair1.png"
              width={300}
              height={300}
              alt="chair category"
            />
          </div>
          <div className="grid grid-cols-3 grid-rows-2 gap-3 w-[66%] max-md:w-full h-full max-md:gap-8">
            {data.map((product) => (
              <div
                key={product.id}
                className="flex flex-col h-full w-full justify-center gap-2 items-center cursor-pointer"
                onClick={routeToDest(`/products/${product.id}`)}
              >
                <div className="relative flex justify-center items-center p-5 shadow rounded-md bg-[#F7F7F7] h-[200px] w-full">
                  <Image
                    src={product.image ? product.image : ''}
                    fill
                    alt={product.alt}
                    className="object-contain"
                  />
                </div>
                <div className="flex gap-2 items-center w-full max-md:flex-col">
                  <h4>{product.product}</h4>
                  <span className="font-bold text-left w-full">
                    {formatCurrency(product.price as number)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex bg-black fixed bottom-0 left-0 right-0">
        <ShowCartAdded />
      </div>
    </main>
  );
};

export default Home;
