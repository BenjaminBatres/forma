"use client";

interface IProps {
  total: number;
}
export default function OrderSunmary({ total }: IProps) {
  const summary = ["Subtotal", "Total"];
  return (
    <div className="space-y-5 md:w-[45%] xl:w-1/4 sticky top-26.25 h-full">
      <div>
        <div className="py-2.5 px-5 bg-white border border-[#e6e6e6]">
          <h2 className="text-[28px] font-medium">Order Summary</h2>
        </div>
        <div className="p-5 bg-white border-x border-b border-[#e6e6e6] space-y-2">
          {summary.map((sum, id) => (
            <div className="flex justify-between" key={id}>
              <p className="text-[#222]/80 font-medium">{sum}</p>
              <p
                className={`${id === 1 ? "font-bold text-lg" : "font-medium"}`}
              >
                $ {total.toFixed(2)} USD
              </p>
            </div>
          ))}
        </div>
      </div>
      <button className="bg-black py-3.5 px-12 w-full text-white font-medium cursor-not-allowed">
        Place Order
      </button>
    </div>
  );
}
