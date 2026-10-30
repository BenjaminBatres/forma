import Link from "next/link";
import Product from "../ui/Product";
import { useEffect, useState } from "react";
import SkeletonProductCard from "../SkeletonProductCard";
interface IProduct {
  thumbnail: string;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  id: number;
  category: string;
  description: string;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
}

interface IProps {
  id: string;
  category: string | undefined;
}
interface WishlistItem {
  id: number;
}
export default function RelevantProductSection({ category, id }: IProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
      setIsLoading(false);
    }
    fetchProducts();
  }, []);
  return (
    <section className="pt-10 pb-20 px-5">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex items-center justify-between flex-wrap gap-y-1">
          <h2 className="text-[38px] sm:text-[44px] md:text-5xl lg:text-[54px] font-semibold">
            Relevant Products
          </h2>
          <Link
            href={`/products/category/${category}`}
            className="font-medium text-sm"
          >
            Shop Now
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-4">
          {isLoading ? (
            <SkeletonProductCard productCards={4} />
          ) : (
            <>
              {products
                ?.filter(
                  (product) =>
                    product.id !== +id && product.category === category,
                )
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
    </section>
  );
}
