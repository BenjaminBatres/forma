"use client";
import { useEffect, useState } from "react";
import Products from "./ui/Products";

interface IProduct {
  id: number;
  title: string;
  images: string[];
  thumbnail: string;
  price: number;
  discountPercentage: number;
  rating: number
  category: string
}

export default function ProductSection() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
      setIsLoading(false)
    }
    fetchProducts();
  }, []);

  return (
    <section className="py-13 px-5">
      <div className="max-w-7xl mx-auto space-y-13">
        <Products isLoading={isLoading} category="beauty" products={products}/>
        <Products isLoading={isLoading} category="fragrances" products={products}/>
        <Products isLoading={isLoading} category="groceries" products={products}/>
        <Products isLoading={isLoading} category="furniture" products={products}/>
      </div>
    </section>
  );
}
