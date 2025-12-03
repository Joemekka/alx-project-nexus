import { ProductProp, ProductsItem } from '@/interfaces';

const filterByTag = (item: ProductProp[], tag: any) => {
  const findTag = item.filter((product) => {
    product.tag?.toLocaleLowerCase().includes(tag.toLocaleLowerCase());
  });
  return findTag;
};
export default filterByTag;
