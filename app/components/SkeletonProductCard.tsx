import SkeletonBox from "./SkeletonBox";
interface IProductCards {
  productCards: number;
}
export default function SkeletonProductCard({ productCards }: IProductCards) {
  return Array(productCards)
    .fill(0)
    .map((_, id) => (
      <div key={id}>
        <SkeletonBox width={"100%"} height={376} borderRadius={'1rem'}  boxShadow="15px 15px 30px #bebebe,-15px -15px 30px #ffffff" />
      </div>
    ));
}
