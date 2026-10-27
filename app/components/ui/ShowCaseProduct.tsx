import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
interface IProduct {
  thumbnail: string;
  title: string;
  price: number;
  discountPercentage: number;
  id: number;
}

export default function ShowCaseProduct({
  id,
  discountPercentage,
  price,
  thumbnail,
  title,
}: IProduct) {
  const discountPercent = discountPercentage / 100;
  const originalPrice = price / (1 - discountPercent);
  return (
    <a
      href={`/products/${id}`}
      className="rounded-2xl flex flex-col sm:max-h-full gap-2 group pt-6 pb-3 px-6 shadow-[5px_1px_10px_#bebebe] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-16 h-16">
        {discountPercentage > 5 && (
          <div className="absolute transform -rotate-45 bg-blue-600 text-center text-white font-medium py-1 -left-12 top-8 w-42.5 text-sm">
            {Math.round(discountPercentage)}% off
          </div>
        )}
      </div>

      <FaRegHeart className="absolute top-6 right-6 text-lg" />
      <figure className="rounded-2xl flex justify-center">
        <Image
          src={thumbnail.toString()}
          width={300}
          height={300}
          alt=""
          loading="eager"
          className="group-hover:scale-110 duration-300 "
        />
      </figure>
      <h3 className="text-lg font-semibold line-clamp-2 sm:line-clamp-1">{title}</h3>
      <div className="flex gap-2 items-center">
        <p className="font-semibold">${price}</p>
        {discountPercentage > 5 && (
          <p className="text-zinc-400 line-through">
            ${Math.round(originalPrice)}
          </p>
        )}
      </div>
    </a>
  );
}
