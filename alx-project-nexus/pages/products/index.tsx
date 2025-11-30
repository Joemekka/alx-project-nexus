import { GetStaticProps } from 'next';
import { ProductProp, ProductsItem } from '@/interfaces';
import { axiosClient } from '@/lib/axiosClient';
import Image from 'next/image';
import Nav from '@/components/layouts/Nav';
import Search from '@/components/common/Search';
import Filter from '@/components/common/Filter';
import Sort from '@/components/common/Sort';
import { routeToDest } from '@/utils/pageRoute';

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
  console.log(data);
  return (
    <main className="mb-14">
      <div className="bg-(--secondryColor)">
        <Nav />
      </div>
      <div className="w-[90%] m-auto">
        <div className="flex justify-between mt-10">
          <div className="flex w-[300px] items-center gap-3.5 ">
            <h4>Products</h4>
            <Search products={data} />
          </div>
          <div className="flex justify-end w-[200px]">
            <Sort />
            <Filter />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5  grid-rows-2 mt-9 ">
          {data?.map((product) => (
            <div
              className="h-[250px] cursor-pointer"
              onClick={routeToDest(`/products/${product.id}`)}
            >
              <div className="flex flex-col justify-start gap-3 items-center h-full w-[90%] m-auto">
                <div className="postion relative w-[90%] shadow rounded-md m-auto h-full">
                  <Image
                    src={product.image ?? ''}
                    fill
                    alt={product.alt}
                    className="border object-center"
                  />
                </div>
                <div className="flex justify-between  w-[85%]">
                  <h4 className="text-black ">{product.product}</h4>
                  <h4 className="font-bold">{product.price}</h4>
                </div>
                <button className="bg-black text-white w-[90%]  rounded-md">
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
