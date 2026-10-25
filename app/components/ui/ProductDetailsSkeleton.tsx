import SkeletonBox from "../SkeletonBox";

export default function ProductDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Title and category skeleton */}
      <div className="space-y-2">
        <SkeletonBox width="100%" height="2.5rem" />
        <SkeletonBox width="30%" height="1.5rem" />
      </div>

      {/* Price and rating skeleton */}
      <div className="space-y-3">
        <SkeletonBox width="35%" height="2rem" />
        <SkeletonBox width="25%" height="1.25rem" />
        <SkeletonBox width="25%" height="1.25rem" />
      </div>

      {/* Description skeleton */}
      <div className="space-y-2">
        {/* <p className="text-lg font-bold">Description:</p> */}
        <SkeletonBox width="25%" height="1.5rem" />
        <SkeletonBox width="100%" height="4.5rem" />
      </div>

      {/* Quantity and button skeleton */}
      <div className="space-y-2">
        <SkeletonBox width="100%" height="2.5rem" />
        <SkeletonBox width="100%" height="2.75rem" />
      </div>

      {/* Shipping Info */}
      <div className="space-y-2">
        <SkeletonBox width="50%" height="1rem" />
        <SkeletonBox width="50%" height="1rem" />
        <SkeletonBox width="50%" height="1rem" />
      </div>
    </div>
  );
}
