import { GetStaticProps } from 'next';
import { ProductProp, ProductsItem } from '@/interfaces';
import { axiosClient } from '@/lib/axiosClient';
import Image from 'next/image';
import Nav from '@/components/layouts/Nav';
import Search from '@/components/common/Search';
import Filter from '@/components/common/Filter';
import Sort from '@/components/common/Sort';
import { routeToDest } from '@/utils/pageRoute';
import { useState } from 'react';
import { formatCurrency } from '@/utils/formatCurrency';

export const getStaticProps: GetStaticProps<ProductsItem> = async () => {
  try {
    const product = await axiosClient.get<ProductProp[]>('/');

    return {
      props: { data: product.data },
    };
  } catch (error) {
    console.log('Failed To Fetch Product');

    return {
      props: { data: [] },
    };
  }
};

const Products: React.FC<ProductsItem> = ({ data }) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductProp[]>(data);
  const [activeTag, setActiveTag] = useState<string>('All');
  const [filterAccodion, setFilterAccodion] = useState(false);

  const handleAccodion = () => {
    setFilterAccodion((prev) => !prev);
  };

  const handleTag = (tag: string) => {
    setActiveTag(tag);

    if (tag === 'All') {
      setFilteredProducts(data);
      return;
    }

    const results = data.filter((product) =>
      product.tag?.toLowerCase().includes(tag.toLowerCase())
    );

    setFilteredProducts(results);
  };

  return (
    <main className="mb-14 min-h-[600px]">
      <div className="bg-(--secondryColor)">
        <Nav />
      </div>
      <div className="w-[90%] m-auto">
        <div className="flex justify-between mt-10">
          <div className="flex w-[300px] items-center gap-3.5 ">
            <h4>Products</h4>
            <Search products={data} />
          </div>

          <div className="flex gap-2.5 max-md:hidden">
            <button
              onClick={() => handleTag('All')}
              className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                activeTag === 'All' ? 'bg-black text-white' : ''
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleTag('Comfort')}
              className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                activeTag === 'Comfort' ? 'bg-black text-white' : ''
              }`}
            >
              Comfort
            </button>
            <button
              onClick={() => handleTag('Home')}
              className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                activeTag === 'Home' ? 'bg-black text-white' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleTag('Office')}
              className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                activeTag === 'Office' ? 'bg-black text-white' : ''
              }`}
            >
              Office
            </button>
            <button
              onClick={() => handleTag('Bedroom')}
              className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                activeTag === 'Bedroom' ? 'bg-black text-white' : ''
              }`}
            >
              Bedroom
            </button>
            <button
              onClick={() => handleTag('Chair')}
              className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                activeTag === 'Chair' ? 'bg-black text-white' : ''
              }`}
            >
              Chair
            </button>
            <button
              onClick={() => handleTag('Gaming')}
              className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                activeTag === 'Gaming' ? 'bg-black text-white' : ''
              }`}
            >
              Gaming
            </button>
          </div>
          <div className="flex justify-end w-[120px]">
            <button onClick={handleAccodion}>
              <Sort />
              {filterAccodion && (
                <div className="fixed top-30 left-75 md:hidden ">
                  <button
                    onClick={() => handleTag('All')}
                    className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                      activeTag === 'All' ? 'bg-black text-white' : ''
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleTag('Comfort')}
                    className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                      activeTag === 'Comfort' ? 'bg-black text-white' : ''
                    }`}
                  >
                    Comfort
                  </button>
                  <button
                    onClick={() => handleTag('Home')}
                    className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                      activeTag === 'Home' ? 'bg-black text-white' : ''
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleTag('Office')}
                    className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                      activeTag === 'Office' ? 'bg-black text-white' : ''
                    }`}
                  >
                    Office
                  </button>
                  <option
                    onClick={() => handleTag('Bedroom')}
                    className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                      activeTag === 'Bedroom' ? 'bg-black text-white' : ''
                    }`}
                  >
                    Bedroom
                  </option>
                  <button
                    onClick={() => handleTag('Chair')}
                    className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                      activeTag === 'Chair' ? 'bg-black text-white' : ''
                    }`}
                  >
                    Chair
                  </button>
                  <button
                    onClick={() => handleTag('Gaming')}
                    className={`flex justify-center items-center bg-[#c6c7c9ae] backdrop-blur-sm text-center rounded-sm shadow h-[30px] w-20 ${
                      activeTag === 'Gaming' ? 'bg-black text-white' : ''
                    }`}
                  >
                    Gaming
                  </button>
                </div>
              )}
            </button>

            <Filter
              data={data}
              onFilter={(results) => setFilteredProducts(results)}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5  grid-rows-2 mt-9 ">
          {filteredProducts.map((product) => (
            <div
              className="h-[250px] cursor-pointer"
              key={product.id}
              onClick={routeToDest(`/products/${product.id}`)}
            >
              <div className="flex flex-col justify-start gap-3 items-center h-full w-[90%] m-auto">
                <div className="relative w-[90%] shadow rounded-md m-auto h-full">
                  <Image
                    src={product.image ?? ''}
                    fill
                    alt={product.alt}
                    className="object-contain object-center"
                  />
                </div>
                <div className="flex justify-between w-[85%]">
                  <h4 className="text-black">{product.product}</h4>
                  <h4 className="font-bold">
                    {formatCurrency(product.price as number)}
                  </h4>
                </div>
                <button className="bg-black text-white w-[90%] rounded-md">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;
