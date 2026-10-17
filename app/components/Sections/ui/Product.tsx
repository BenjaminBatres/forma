import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import Rating from "./Rating";
import Link from "next/link";

interface IProduct {
  thumbnail: string;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
}

export default function Product({
  discountPercentage,
  price,
  rating,
  thumbnail,
  title,
}: IProduct) {
  return (
    <Link
      href={"/"}
      className="rounded-2xl space-y-2 group p-6 shadow-[15px_15px_30px_#bebebe,-15px_-15px_30px_#ffffff] relative"
    >
      <FaRegHeart className="absolute top-6 right-6 text-lg" />
      <figure className="rounded-2xl flex justify-center">
        <Image
          src={thumbnail.toString()}
          width={300}
          height={300}
          alt=""
          loading="eager"
          className="group-hover:scale-110 duration-300"
        />
      </figure>
      <h3 className="text-xl font-semibold line-clamp-1">{title}</h3>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <p className="font-semibold">${price}</p>
          <p className="text-zinc-400 line-through">${discountPercentage}</p>
        </div>
        <Rating rating={rating} />
      </div>
    </Link>
  );
}
