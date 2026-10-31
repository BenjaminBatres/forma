"use client";
import { useEffect, useState } from "react";
import { TbShoppingBag } from "react-icons/tb";
import { TfiClose } from "react-icons/tfi";

export default function AddToCart() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div>
      <TbShoppingBag
        className="text-[28px] cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      />

      <div
        onClick={() => setIsModalOpen(false)}
        className={`fixed bg-[#000c] inset-0 z-60 flex flex-col items-center justify-center ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"} duration-300`}
      >
        <div
          className={`bg-white max-w-120 flex flex-col w-[92%] sm:w-full ${isModalOpen ? "scale-100" : "scale-95"} duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
        >
          <div className="flex justify-between items-center py-4 px-6 border-b border-[#e6e6e6e6]">
            <h2 className="text-2xl font-semibold ">Your Cart</h2>
            <TfiClose
              onClick={() => setIsModalOpen(false)}
              className="text-xl mt-1 cursor-pointer"
            />
          </div>
          <div className="py-25 flex items-center justify-center">
            <p>No items found.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
