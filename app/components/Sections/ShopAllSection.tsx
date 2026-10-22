"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Accordion from "./Accordion";
import Product from "../ui/Product";
import SkeletonProductCard from "../SkeletonProductCard";
import AccordionFilters from "./AccordionFilters";
import FilteredProduct from "../ui/FilteredProduct";
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
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
      setProducts(products.sort((a, b) => b.price - a.price));
    } else {
      products.sort((a, b) => a.price - b.price);
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
    {
      title: "rating",
      name: "Rating",
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
      title: "discountPercentage",
      name: "Discount",
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
  ];

  useEffect(() => {
    async function fetchProducts() {
      if (sortByCategory === "All" && sortByFilter) {
        setIsLoading(true);
        const res = await fetch(`https://dummyjson.com/products`);
        const data = await res.json();
        setProducts(data.products);
        handleSortProducts(sortByOrder);
      } else if (sortByCategory === "All") {
        setIsLoading(true);
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } else {
        setIsLoading(true);
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
    <section className="pt-33 sm:pt-40 pb-12.5 px-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-15 sm:gap-4 relative">
        <div className="sm:w-[40%] md:w-[30%] sm:mt-40 space-y-7.5 sm:sticky top-30 h-full">
          <div className="sm:hidden space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true}}
              transition={{ duration: 0.5 }}
              className="text-5xl lg:text-[54px] font-bold"
            >
              Shop All
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-Muted text-sm"
            >
              For the way you live, feel, and experience the everyday. Discover
              fragrances, beauty, home furnishings, and everyday goods,
              thoughtfully brought together in one place.
            </motion.p>
          </div>
          <div className="flex gap-4">
            <p className="text-zinc-400 font-medium">Sort by</p>
            <p className="capitalize">{sortByCategory}</p>
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
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          ))}
        </div>
        <div className="sm:w-[60%] md:w-[70%] space-y-15">
          <div className="hidden sm:block space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-5xl lg:text-[54px] font-bold"
            >
              Shop All
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-Muted text-sm"
            >
              For the way you live, feel, and experience the everyday. Discover
              fragrances, beauty, home furnishings, and everyday goods,
              thoughtfully brought together in one place.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
            {isLoading ? (
              <SkeletonProductCard productCards={6} />
            ) : (
              <>
                {sortByCategory === "All" ? (
                  <>
                    <FilteredProduct
                      filterName="price"
                      products={products}
                      sortByFilter={sortByFilter}
                      sortByOrder={sortByOrder}
                    />
                    <FilteredProduct
                      filterName="title"
                      products={products}
                      sortByFilter={sortByFilter}
                      sortByOrder={sortByOrder}
                    />
                    <FilteredProduct
                      filterName="rating"
                      products={products}
                      sortByFilter={sortByFilter}
                      sortByOrder={sortByOrder}
                    />
                    <FilteredProduct
                      filterName="discountPercentage"
                      products={products}
                      sortByFilter={sortByFilter}
                      sortByOrder={sortByOrder}
                    />
                    {!sortByFilter && (
                      <>
                        {/* Default */}
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
                  </>
                ) : (
                  // Category Products
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
