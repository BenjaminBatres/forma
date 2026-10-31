"use client";
import { useParams } from "next/navigation";
import ProductDetailsSection from "./ProductDetailsSection";
import RelevantProductSection from "./RelevantProductSection";
import { useEffect, useState } from "react";

interface IProduct {
  images: string[];
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
  stock: number;
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <ProductDetailsSection isLoading={isLoading} product={product} />
      <RelevantProductSection id={id} category={product?.category} />
    </>
  );
}
