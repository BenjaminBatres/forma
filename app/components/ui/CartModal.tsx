import { decreaseQuantity, increaseQuantity } from "@/app/redux/counterSlice";
import { RootState } from "@/app/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { TfiClose } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CartModal({ isModalOpen, setIsModalOpen }: IProps) {
  const cartItems = useSelector((state: RootState) => state.counter.items);
  const dispatch = useDispatch();
  const total = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
    <>
      <div
        onClick={() => setIsModalOpen(false)}
        className={`fixed bg-[#000c] inset-0 z-60 ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"} duration-300`}
      />
      <div
        className={`fixed top-1/2 left-1/2 -translate-1/2 border z-60 max-w-120 w-full flex flex-col items-center justify-center ${isModalOpen ? "opacity-100 scale-100" : "scale-95 opacity-0 pointer-events-none"} duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
      >
        <div className={`bg-white flex flex-col w-[92%] sm:w-full`}>
          <div className="flex justify-between items-center py-4 px-6 border-b border-[#e6e6e6e6]">
            <h2 className="text-2xl font-semibold ">Your Cart</h2>
            <TfiClose
              onClick={() => setIsModalOpen(false)}
              className="text-xl mt-1 cursor-pointer"
            />
          </div>
          {cartItems.length > 0 ? (
            <>
              <div
                className={`py-3 px-6 overflow-y-auto ${cartItems.length > 2 ? "h-75" : "h-auto"}`}
              >
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-3 flex justify-between items-center gap-2"
                  >
                    <div className="flex gap-3 items-center">
                      <Link
                        href={`/products/${item.id}`}
                        onClick={() => setIsModalOpen(false)}
                      >
                        <Image
                          src={item.image}
                          width={64}
                          height={64}
                          alt=""
                          className="shadow"
                        />
                      </Link>
                      <div className="space-y-1">
                        <h2 className="text-[15px] font-semibold line-clamp-1">
                          {item.name}
                        </h2>
                        <p className="text-[15px] font-medium">${item.price}</p>
                      </div>
                    </div>

                    <div className="flex justify-around items-center bg-[#fafafa] border-[#ddd] w-24 h-8">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="cursor-pointer text-black/25 font-bold text-sm hover:text-Orange duration-300"
                      >
                        -
                      </button>
                      <span className="text-black font-bold text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="cursor-pointer text-black/25 font-bold text-sm hover:text-Orange duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 px-6 pb-6 border-t border-[#e6e6e6e6] space-y-4">
                <div className="flex justify-between">
                  <p className="font-medium">Subtotal</p>
                  <p className="font-medium">${total().toFixed(2)}</p>
                </div>
                <Link
                  href={"/checkout"}
                  onClick={() => setIsModalOpen(false)}
                  className="flex justify-center bg-black py-2.75 text-white font-medium px-4"
                >
                  Continue to Checkout
                </Link>
              </div>
            </>
          ) : (
            <div className="py-25 flex items-center justify-center">
              <p>No items found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
