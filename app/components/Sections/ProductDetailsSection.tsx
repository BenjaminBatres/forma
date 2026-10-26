import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import Rating from "../ui/Rating";
import SkeletonBox from "../SkeletonBox";
import ProductDetailsSkeleton from "../ui/ProductDetailsSkeleton";
import { motion } from "motion/react";
import { MdDiscount } from "react-icons/md";

interface IProduct {
  images: string[];
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  id: number;
  category: string;
  description: string;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
}

interface IProps {
  product: IProduct | null;
  isLoading: boolean;
}

export default function ProductDetailsSection({ isLoading, product }: IProps) {
  return (
    <section className="pt-30 md:pb-5 lg:pb-20 px-5">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.45fr_1fr] gap-7.5">
        {isLoading ? (
          <>
            <div className="hidden md:block">
              <SkeletonBox height={740} />
            </div>
            <div className="hidden sm:block md:hidden">
              <SkeletonBox height={500} />
            </div>
            <div className="sm:hidden">
              <SkeletonBox height={300} />
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow"
          >
            {product && (
              <Image
                src={product?.images[0]}
                alt=""
                loading="eager"
                width={1000}
                height={1000}
                className="sm:h-150 md:h-full object-cover"
              />
            )}
          </motion.div>
        )}

        <div className="space-y-6">
          {isLoading ? (
            <ProductDetailsSkeleton />
          ) : (
            <>
              {/* Title and Category*/}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <h2 className="text-2xl md:text-[28px] font-semibold">
                    {product?.title}
                  </h2>
                  <FaRegHeart className="text-lg mt-1" />
                </div>
                <p className="text-[#222]/60 font-medium">
                  Category:{" "}
                  <span className="capitalize">{product?.category}</span>
                </p>
              </motion.div>

              {/* Price and Rating */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="space-y-3"
              >
                <div className="flex gap-2 items-center">
                  <div className="font-semibold text-2xl">
                    ${product?.price}
                  </div>
                  {product && (
                    <>
                      {product?.discountPercentage > 5 && (
                        <p className="text-zinc-400 line-through text-lg">
                          $
                          {Math.round(
                            product.price /
                              (1 - product?.discountPercentage / 100),
                          ).toFixed(2)}
                        </p>
                      )}
                    </>
                  )}
                </div>
                {product?.discountPercentage && (
                  <>
                    {product?.discountPercentage > 5 && (
                      <div className="flex gap-2 items-center">
                        <MdDiscount className="text-zinc-400" />
                        {product?.discountPercentage && (
                          <p className="text-zinc-400">
                            Save {Math.round(product?.discountPercentage)}%
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}
                {product?.rating && <Rating rating={product?.rating} />}
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <p className="text-lg font-bold">Description:</p>
                <p className="text-[#222]/70">{product?.description}</p>
              </motion.div>

              {/* Input and Cart */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-2.5"
              >
                <input
                  type="number"
                  min={1}
                  className="bg-[#ececec] w-full h-9.5 p-3 rounded outline-0 focus:border-2"
                />
                <div className="bg-black text-white text-center py-2.5 px-3.5 font-medium">
                  Add to Cart
                </div>
              </motion.div>

              {/* Shipping Info */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="pl-5">
                  <li className="text-[#222]/60 text-[15px]">
                    {product?.shippingInformation}
                  </li>
                  <li className="text-[#222]/60 text-[15px]">
                    {product?.returnPolicy}
                  </li>
                  <li className="text-[#222]/60 text-[15px]">
                    {product?.warrantyInformation}
                  </li>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
