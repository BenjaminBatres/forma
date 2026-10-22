import Product from "./Product";

interface IProduct {
  id: number;
  title: string;
  images: string[];
  thumbnail: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
}

interface IProps {
  filterName: string;
  sortByFilter: string;
  sortByOrder: string;
  products: IProduct[];
}
export default function FilteredProduct({
  filterName,
  sortByFilter,
  sortByOrder,
  products,
  
}: IProps) {
  const sortProducts = (
    products: IProduct[],
    sortByFilter: keyof IProduct,
    sortByOrder: string,
  ) => {
    return [...products].sort((a, b) => {
      const valueA = a[sortByFilter];
      const valueB = b[sortByFilter];

      if (valueA < valueB) return sortByOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortByOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  if (sortByFilter !== filterName) {
    return null;
  }

  const sortedProducts = sortProducts(
    products,
    sortByFilter as keyof IProduct,
    sortByOrder,
  );
  return (
    <>
      {sortedProducts.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          rating={product.rating}
          thumbnail={product.thumbnail}
          discountPercentage={product.discountPercentage}
        />
      ))}
    </>
  );
}
