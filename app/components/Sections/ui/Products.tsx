import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import Rating from "./Rating";
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
  products: IProduct[];
  category: string;
}

export default function Products({ products, category }: IProps) {
  return (
    <div className="space-y-7">
      <div className="flex justify-between items-center">
        <h2 className="capitalize text-4xl font-bold">{category}</h2>
        <Link href={"/"} className="text-lg font-semibold">
          View All
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products
          ?.filter((product) => product.category === category)
          .slice(0, 4)
          .map((product, id) => (
            <Product
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
  );
}
