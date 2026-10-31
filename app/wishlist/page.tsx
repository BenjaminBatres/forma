"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Product from "../components/ui/Product";
import SkeletonProductCard from "../components/SkeletonProductCard";

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

interface IWishlist {
  id: number;
}
export default function page() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState<IWishlist[]>([]);

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

  useEffect(() => {
    const allWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(allWishlist);
    async function fetchProducts() {
      const res = await fetch(`https://dummyjson.com/products`);
      const data = await res.json();
      setProducts(data.products);
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <section
      className={`${wishlist.length < 1 ? "pt-50 pb-55" : "pt-35 pb-20 sm:pt-35 lg:pt-50"}  px-5`}
    >
      {wishlist.length < 1 ? (
        <div className="flex flex-col justify-center items-center gap-20">
          <h2 className="text-5xl md:text-[54px] leading-[100%] font-semibold">
            Wishlist
          </h2>
          <div className="flex flex-col items-center gap-5">
            <p className="text-center">Seems like you have no items on your wishlist yet!</p>
            <Link
              href={"/products"}
              className="py-3 px-4 bg-white font-semibold rounded shadow-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-[44px] sm:text-5xl md:text-[54px] leading-[100%] font-semibold">
            Wishlist
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              <SkeletonProductCard productCards={3} />
            ) : (
              <>
                {products
                  .filter((product) =>
                    wishlist.some((item) => item.id === product.id),
                  )
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
      )}
    </section>
  );
}
