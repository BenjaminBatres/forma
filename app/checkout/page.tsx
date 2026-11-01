"use client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CheckoutForm from "../components/CheckoutForm";
import OrderSunmary from "../components/OrderSunmary";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";

export default function page() {
  const cartItems = useSelector((state: RootState) => state.counter.items);
  const total = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="pt-30 px-5 pb-5">
      <div className="max-w-7xl mx-auto">
        {cartItems.length < 1 ? (
          <div className="min-h-[calc(100vh-300px)] flex flex-col justify-center items-center gap-2">
            <TiShoppingCart className="text-8xl" />
            <div className="flex flex-col gap-4 items-center">
              <p className="text-center text-2xl">
                Your shopping cart is empty
              </p>
              <Link
                href={"/products"}
                className="py-3 px-4 bg-white font-semibold rounded shadow-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-5 relative">
            <CheckoutForm cartItems={cartItems} />
            <OrderSunmary total={total()} />
          </div>
        )}
      </div>
    </div>
  );
}
