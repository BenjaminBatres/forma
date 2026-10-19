import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import Rating from "./Rating";
import Link from "next/link";
import { motion } from "motion/react";

interface IProduct {
  thumbnail: string;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  id: number;
}

export default function Product({
  id,
  discountPercentage,
  price,
  rating,
  thumbnail,
  title,
}: IProduct) {
  const discountPercent = discountPercentage / 100;
  const originalPrice = price / (1 - discountPercent);
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 * id, duration: 0.5 }}
      className="rounded-2xl space-y-2 group p-6 shadow-[15px_15px_30px_#bebebe,-15px_-15px_30px_#ffffff] relative overflow-hidden"
    >
      <Link href={"/"}>
        <div className="absolute top-0 left-0 w-16 h-16">
          <div className="absolute transform -rotate-45 bg-blue-600 text-center text-white font-medium py-1 -left-10 top-8 w-42.5">
            {Math.round(discountPercentage)}% off
          </div>
        </div>

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
        <div className="flex flex-wrap justify-between items-center gap-1">
          <div className="flex gap-2 items-center">
            <p className="font-semibold text-lg">${price}</p>
            <p className="text-zinc-400 line-through">
              ${Math.round(originalPrice).toFixed(2)}
            </p>
          </div>
          <Rating rating={rating} />
        </div>
      </Link>
    </motion.div>
  );
}
