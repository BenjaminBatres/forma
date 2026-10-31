"use client";
import { useState } from "react";
import { TbShoppingBag } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CartModal from "./ui/CartModal";

export default function AddToCart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.counter.items);

  return (
    <div>
      <div className="relative">
        <TbShoppingBag
          className="text-[28px] cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        {cartItems.length > 0 && (
          <div className="absolute -top-1.5 -right-1 h-5 w-5 bg-blue-600 rounded-full flex justify-center items-center text-white text-sm">
            {cartItems.length}
          </div>
        )}
      </div>

      <CartModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
