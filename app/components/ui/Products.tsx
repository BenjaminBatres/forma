import Link from "next/link";
import Product from "./Product";
import SkeletonProductCard from "../SkeletonProductCard";
import { useState } from "react";

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
  isLoading: boolean;
  products: IProduct[];
  category: string;
}

interface WishlistItem {
  id: number;
}

export default function Products({ products, category, isLoading }: IProps) {
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
  return (
    <div className="space-y-7">
      <div className="flex justify-between items-center">
        <h2 className="capitalize text-4xl font-bold">{category}</h2>
        <Link href={"/products"} className="text-lg font-semibold">
          View All
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <SkeletonProductCard productCards={4} />
        ) : (
          <>
            {products
              ?.filter((product) => product.category === category)
              .slice(0, 4)
              .map((product) => (
                <Product
                  id={product.id}
                  key={product.id}
                  discountPercentage={product.discountPercentage}
                  price={product.price}
                  rating={product.rating}
                  thumbnail={product.thumbnail}
                  title={product.title}
                  wishlist={wishlist}
                  handleWishlistToggle={handleWishlistToggle}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
}
