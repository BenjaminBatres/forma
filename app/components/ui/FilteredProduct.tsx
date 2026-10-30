import { useState } from "react";
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

interface WishlistItem {
  id: number;
}
export default function FilteredProduct({
  filterName,
  sortByFilter,
  sortByOrder,
  products,
}: IProps) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (typeof window === "undefined") return [];

    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  });

  const handleWishlistToggle = (id: number) => {
    setWishlist((prevWishlist) => {
      const alreadySaved = prevWishlist.some((item) => item.id === id);

      const updatedWishlist = alreadySaved
        ? prevWishlist.filter((item) => item.id !== id)
        : [...prevWishlist, { id }];

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      return updatedWishlist;
    });
  };
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
          wishlist={wishlist}
          handleWishlistToggle={handleWishlistToggle}
        />
      ))}
    </>
  );
}
