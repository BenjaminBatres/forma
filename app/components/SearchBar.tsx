"use client";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import SkeletonBox from "./SkeletonBox";
import ShowCaseProduct from "./ui/ShowCaseProduct";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import CategoryShowcaseSlide from "./ui/CategoryShowcaseSlide";

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
export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchedProducts, setSearchProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const categories = ["beauty", "fragrances", "groceries", "furniture"];
  const categoriesLinks = [
    {
      path: "/product/category/beauty",
    },
  ];
  useEffect(() => {
    async function fetchSearchedProducts() {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${searchTerm}`,
      );
      const data = await res.json();
      setSearchProducts(data.products);
      setIsLoading(false);
    }
    fetchSearchedProducts();
    async function fetchProducts() {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
      setIsLoading(false);
    }
    fetchProducts();
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, searchTerm]);
  return (
    <>
      <IoIosSearch
        className="text-[30px] cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      />
      <div
        className={`absolute top-0 lg:top-20 left-0 w-full min-h-screen z-55 xl:min-h-auto bg-white ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} duration-300`}
      >
        <div className="space-y-7.5 xl:shadow-sm xl:pb-10">
          <div className="px-4 pt-8 lg:pt-5 ">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 lg:gap-7.5">
                <div className="relative w-full">
                  <IoIosSearch className="absolute top-2 left-2 text-2xl" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-zinc-400 pl-10 py-2.5 h-10 text-[15px] rounded outline-0 w-full"
                  />
                </div>
                <TfiClose
                  className="text-[28px] cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
            </div>
          </div>
          {searchTerm ? (
            <div className="overflow-y-auto h-lvh xl:h-auto space-y-5 pb-45">
              <div className="px-4">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col xl:flex-row gap-y-5">
                    <h2 className="text-2xl font-semibold md:w-[35%]">
                      Results for: "{searchTerm}"
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:flex gap-4">
                      {searchedProducts.slice(0, 4).map((product) => (
                        <ShowCaseProduct
                          key={product.id}
                          id={product.id}
                          discountPercentage={product.discountPercentage}
                          price={product.price}
                          thumbnail={product.thumbnail}
                          title={product.title}
                        />
                      ))}
                      {searchedProducts.length < 1 && (
                        <p>There were no results for "{searchTerm}"</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col xl:flex-row justify-between gap-y-2">
                  <div className="flex-1 space-y-2.5">
                    <p className="font-bold">Discover something new</p>
                    <ul className="space-y-2.5">
                      {categories.map((category) => (
                        <li key={category}>
                          <a
                            href={`/products/category/${category}`}
                            className="text-[#222]/80 capitalize"
                          >
                            {category}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-5">
                    <h2 className="text-2xl font-semibold">Products</h2>
                    <Swiper
                      spaceBetween={16}
                      breakpoints={{
                        640: {
                          slidesPerView: 2,
                        },
                        1024: {
                          slidesPerView: 3,
                        },
                        1200: {
                          slidesPerView: 4,
                        },
                      }}
                      pagination={true}
                      modules={[Pagination]}
                      className="xl:w-220 h-112 sm:h-117 lg:h-110 xl:h-auto"
                    >
                      {isLoading ? (
                        categories.map((_, id) => (
                          <SwiperSlide>
                            <SkeletonBox key={id} height={270} width={"100%"} />
                          </SwiperSlide>
                        ))
                      ) : (
                        <>
                          {categories.map((category) => (
                            <SwiperSlide className="py-2 pr-2">
                              <CategoryShowcaseSlide
                                key={category}
                                products={products}
                                category={category}
                              />
                            </SwiperSlide>
                          ))}
                        </>
                      )}
                    </Swiper>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
