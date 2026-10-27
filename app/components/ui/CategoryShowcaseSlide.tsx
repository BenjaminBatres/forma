import ShowCaseProduct from "./ShowCaseProduct";
import { useEffect, useState } from "react";
import SkeletonBox from "../SkeletonBox";

interface IProduct {
  thumbnail: string;
  title: string;
  price: number;
  discountPercentage: number;
  id: number;
  category: string;
}

interface IProps {
  products: IProduct[];
  category: string;
}

function CategoryShowcaseSlide({ products, category }: IProps) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!products || products.length === 0) return;
    setIsLoading(true);
    const categoryProducts = products.filter(
      (item) => item.category === category,
    );

    if (categoryProducts.length === 0) {
      setProduct(null);
      return;
    }

    const timer = setTimeout(() => {
      if (categoryProducts.length > 0) {
        const randomIndex = Math.floor(Math.random() * categoryProducts.length);

        setProduct(categoryProducts[randomIndex]);
      } else {
        setProduct(null);
      }

      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (!product) return null;

  return (
    <>
      {isLoading ? (
        <div className="h-full lg:h-67.5">
          <SkeletonBox height={"100%"} width={"100%"} borderRadius={20} />
        </div>
      ) : (
        <ShowCaseProduct
          key={product.id}
          id={product.id}
          discountPercentage={product.discountPercentage}
          price={product.price}
          thumbnail={product.thumbnail}
          title={product.title}
        />
      )}
    </>
  );
}

export default CategoryShowcaseSlide;
