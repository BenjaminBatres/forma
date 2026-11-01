import Link from "next/link";
import CustomerCheckoutForm from "./CustomerCheckoutForm";
import Image from "next/image";

interface ICartItems {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}
interface IProps {
  cartItems: ICartItems[];
}
export default function CheckoutForm({ cartItems }: IProps) {
  const addressDeatils = ["City *", "State/Province", "Zip/Postal Code *"];
  const paymentDeatils = ["Expiration Date *", "Security Code *"];
  return (
    <div className="md:w-[55%] space-y-5">
      <CustomerCheckoutForm title="Customer Info" required={true}>
        <div className="flex flex-col gap-2">
          <label className="text-[#222]/80 font-bold text-sm">Email *</label>
          <input
            type="text"
            className="py-2 px-4 border border-[#ddd] rounded h-9.5"
          />
        </div>
      </CustomerCheckoutForm>
      <CustomerCheckoutForm title="Shipping Address" required={true}>
        <div className="flex flex-col gap-2">
          <label className="text-[#222]/80 font-bold text-sm">
            Full Name *
          </label>
          <input
            type="text"
            className="py-2 px-4 border border-[#ddd] rounded h-9.5"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[#222]/80 font-bold text-sm">
            Street Address *
          </label>

          <div className="flex flex-col gap-4">
            {new Array(2).fill(0).map((_, id) => (
              <input
                key={id}
                type="text"
                className="py-2 px-4 border border-[#ddd] rounded h-9.5"
              />
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addressDeatils.map((address) => (
            <div key={address}>
              <label className="text-sm font-bold text-[#222]/80">
                {address}
              </label>
              <input
                type="text"
                className="py-2 px-4 border border-[#ddd] rounded h-9.5 w-full"
              />
            </div>
          ))}
        </div>
      </CustomerCheckoutForm>
      <CustomerCheckoutForm title="Shipping Method">
        <div className="py-15 flex justify-center items-center">
          <p className="font-bold text-sm">
            No shipping methods are available for the address given.
          </p>
        </div>
      </CustomerCheckoutForm>
      <CustomerCheckoutForm title="Payment Info" required={true}>
        <div className="flex flex-col gap-4">
          <label className="text-sm font-bold text-[#222]/80">
            Card Number *
          </label>
          <input
            type="text"
            disabled
            className="py-2 px-4 border border-[#ddd] rounded h-9.5 w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {paymentDeatils.map((deatils) => (
            <div key={deatils}>
              <label className="text-sm font-bold text-[#222]/80">
                {deatils}
              </label>
              <input
                disabled
                type="text"
                className="py-2 px-4 border border-[#ddd] rounded h-9.5 w-full"
              />
            </div>
          ))}
        </div>
      </CustomerCheckoutForm>
      <CustomerCheckoutForm title="Items in Order">
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="py-3 flex justify-between items-center gap-2"
            >
              <div className="flex gap-3 items-center">
                <Link href={`/products/${item.id}`} className="bg-[#fbfbfb]">
                  <Image src={item.image} width={70} height={70} alt="" />
                </Link>
                <div className="space-y-1">
                  <h2 className="font-semibold line-clamp-1">{item.name}</h2>
                  <div className="text-sm text-[#222]/80 font-medium">
                    Quantity: {item.quantity}
                  </div>
                </div>
              </div>
              <p className="font-medium">${item.price * item.quantity}</p>
            </div>
          ))}
        </div>
      </CustomerCheckoutForm>
    </div>
  );
}
