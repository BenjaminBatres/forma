"use client";

import { useEffect, useState } from "react";
import Accordion from "./Accordion";
import Product from "./ui/Product";

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

export default function ShopAllSection() {
  const [sortBy, setSortBy] = useState();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    <section className="pt-45 pb-12.5 px-5">
      <div className="max-w-7xl mx-auto flex gap-4 relative">
        <div className="w-[30%] mt-40 space-y-7.5 sticky top-30 h-full">
          <div className="flex gap-4">
            <p className="text-zinc-400 font-medium">Sort by</p>
            <p>Collection</p>
          </div>
          <Accordion title="Category" listItems={['Beauty', 'Fragrances', 'Groceries', 'Furniture']}/>
          <Accordion title="Price" listItems={['']} />
          <Accordion title="Name" listItems={['']} />
          <Accordion title="Rating" listItems={['']} />
          <Accordion title="Discount" listItems={['']} />
        </div>
        <div className="w-[70%] space-y-5">
          <div className="space-y-2">
            <h2 className="text-[54px] font-bold">Shop All</h2>
            <p className="text-Muted text-sm">
              For the way you live, feel, and experience the everyday. Discover
              fragrances, beauty, home furnishings, and everyday goods,
              thoughtfully brought together in one place.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {products.map((product, id) => (
              <Product
                id={id}
                key={id}
                discountPercentage={product.discountPercentage}
                price={product.price}
                rating={product.rating}
                thumbnail={product.thumbnail}
                title={product.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
