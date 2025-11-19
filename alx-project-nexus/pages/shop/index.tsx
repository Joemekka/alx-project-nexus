import Header from "@/components/layouts/Header";
import ProductCard from "@/components/common/productCard";

const Shop = () => {
  return (
    <main className="flex flex-col gap-10">
      <Header>
        <div className="h-full">
          <div className="h-full flex justify-center items-center bg-black/30">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-white">Shop</h1>
              <input
                className="bg-white/40 rounded-md placeholder:text-center placeholder:text-[12px]"
                placeholder="search item..."
              />
            </div>
          </div>
        </div>
      </Header>
      <div className="grid grid-cols-4 grid-rows-1 justify-center items-stretch gap-x-[20px] w-[90%] m-auto">
        <ProductCard
          alt="Iphone 15 Pro Max"
          productName="Iphone 15 Pro Max Charger 50w"
          amount={25}
          image="/artboard-Photoroom.jpg"
        />
        <ProductCard
          alt="Iphone 15 Pro Max"
          productName="Iphone 15 Pro Max Charger 50w"
          amount={25}
          image="/artboard-Photoroom.jpg"
        />
        <ProductCard
          alt="Iphone 15 Pro Max"
          productName="Iphone 15 Pro Max Charger 50w"
          amount={25}
          image="/artboard-Photoroom.jpg"
        />

        <ProductCard
          alt="Macbook Pro 1TB Core I7 M1 Chip"
          productName="macbook"
          amount={25}
          image="/assets/macbook.png"
        />
      </div>
    </main>
  );
};
export default Shop;
