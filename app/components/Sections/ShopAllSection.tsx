"use client";

import { useEffect, useState } from "react";
import Accordion from "./Accordion";
import Product from "./ui/Product";
import SkeletonProductCard from "../SkeletonProductCard";
import AccordionFilters from "./AccordionFilters";

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
  const [sortByCategory, setSortByCategory] = useState("All");
  const [sortByFilter, setSortByFilter] = useState("");
  const [sortByOrder, setSortByOrder] = useState("asc");

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSortByCategory = (item: string) => {
    setSortByCategory(item);
  };

  const handleSortByFilter = (item: string, id: string) => {
    setSortByOrder(id);

    setSortByFilter(item);
  };

  const handleSortProducts = (filter: string) => {
    if (filter === "asc") {
      setProducts(products.sort((a, b) => b.price + a.price));
    } else {
      products.sort((a, b) => a.price + b.price);
    }
  };
  const filterLists = [
    {
      title: "price",
      name: "Price",
      listItems: [
        {
          id: "desc",
          name: "Highest to Lowest",
        },
        {
          id: "asc",
          name: "Lowest to Highest",
        },
      ],
    },
    {
      title: "title",
      name: "Name",
      listItems: [
        {
          id: "asc",
          name: "A to Z",
        },
        {
          id: "desc",
          name: "Z to A",
        },
      ],
    },
  ];
  useEffect(() => {
    async function fetchProducts() {
      if (sortByCategory === "All" && sortByFilter) {
        const res = await fetch(`https://dummyjson.com/products`);
        const data = await res.json();
        setProducts(data.products);
        console.log(sortByOrder);
        handleSortProducts(sortByOrder);
      } else if (sortByCategory === "All") {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } else {
        const res = await fetch(
          `https://dummyjson.com/products/category/${sortByCategory}?sortBy=${sortByFilter}&order=${sortByOrder}`,
        );
        const data = await res.json();
        setProducts(data.products);
      }
      setIsLoading(false);
    }
    fetchProducts();
  }, [sortByCategory, sortByFilter, sortByOrder]);
  return (
    <section className="pt-40 pb-12.5 px-5">
      <div className="max-w-7xl mx-auto flex gap-4 relative">
        <div className="w-[30%] mt-40 space-y-7.5 sticky top-30 h-full">
          <div className="flex gap-4">
            <p className="text-zinc-400 font-medium">Sort by</p>
            <p>Collection</p>
          </div>
          <Accordion
            title="Category"
            listItems={[
              "All",
              "beauty",
              "fragrances",
              "groceries",
              "furniture",
            ]}
            setSortBy={setSortByCategory}
            onClick={handleSortByCategory}
            sortBy={sortByCategory}
          />
          {filterLists.map((filter, id) => (
            <AccordionFilters
              key={id}
              name={filter.name}
              title={filter.title}
              listItems={filter.listItems}
              handleSortByFilter={handleSortByFilter}
            />
          ))}
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
            {isLoading ? (
              <SkeletonProductCard productCards={6} />
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
